import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';
import { parseDate, combineDateTime } from '@/utils/formatters';

const prisma = new PrismaClient();

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
  if (obj instanceof Date) return obj.toISOString();
  // Manejar Prisma Decimal
  if (typeof obj === 'object' && 'toNumber' in obj) {
    return obj.toNumber();
  }
  if (Array.isArray(obj)) return obj.map(serializeBigInt);
  if (typeof obj === 'object') {
    const out: any = {};
    for (const k of Object.keys(obj)) {
      out[k] = serializeBigInt(obj[k]);
    }
    return out;
  }
  return obj;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    console.log('[GET /api/recordatorios] Usuario:', user.id);

    const { searchParams } = new URL(request.url);
    const idPago = searchParams.get('id_pago');

    // Construir el where con filtro anidado por usuario
    const where: any = {
      pago: {
        id_usuario: user.id
      }
    };

    // Si se especifica id_pago específico, agregarlo al filtro
    if (idPago) {
      where.id_pago = BigInt(idPago);
    }

    console.log('[GET /api/recordatorios] Where:', JSON.stringify(where, (_, v) => typeof v === 'bigint' ? v.toString() : v));

    const recordatorios = await prisma.recordatorio.findMany({
      where,
      include: {
        pago: {
          include: {
            categoria: true,
            metodo_pago: true
          }
        }
      },
      // Ordenar por fecha y hora (se castea a any para evitar errores de tipos
      // si Prisma client/local schema aún no incluye la columna)
      orderBy: ([{ fecha_aviso: 'asc' }, { hora: 'asc' }] as any)
    });

    console.log('[GET /api/recordatorios] Recordatorios encontrados:', recordatorios.length);

    return NextResponse.json({ recordatorios: serializeBigInt(recordatorios) });
  } catch (error) {
    console.error('GET /api/recordatorios error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { id_pago, fecha_aviso, hora, mensaje, notification_id } = body;

    console.log('[POST /api/recordatorios] body:', JSON.stringify(body));

    if (!id_pago || !fecha_aviso) {
      return NextResponse.json({ error: 'id_pago y fecha_aviso son requeridos' }, { status: 400 });
    }

    // Verificar que el pago pertenece al usuario
    const pago = await prisma.pago.findUnique({
      where: { id_pago: BigInt(id_pago) }
    });

    if (!pago || pago.id_usuario !== user.id) {
      return NextResponse.json({ error: 'Pago no encontrado o no autorizado' }, { status: 404 });
    }

    // Soportar dos formatos desde el cliente:
    // 1) fecha_aviso = "YYYY-MM-DD" y hora = "HH:mm" (client envía separados)
    // 2) fecha_aviso = ISO datetime (ej: "2025-12-31T10:15:00.000Z") y hora = null
    // En el primer caso combinamos fecha+hora en `horaValue`. En el segundo
    // usamos la fecha completa enviada por el cliente.
    const fechaIsDateTime = typeof fecha_aviso === 'string' && /\dT\d/.test(fecha_aviso);

    let fechaAvisoDate: Date;
    let horaValue: Date | null = null;
    let horaString: string | null = null;

    if (fechaIsDateTime) {
      // Cliente ya envió fecha+hora completa en `fecha_aviso` (ISO). Extraemos
      // la parte de fecha para `fecha_aviso` y guardamos la fecha completa en `hora`.
      const combined = parseDate(fecha_aviso);
      fechaAvisoDate = new Date(combined.getFullYear(), combined.getMonth(), combined.getDate());
      horaValue = combined;
      // Derivar hora string en formato HH:mm:ss usando la hora local
      const hh = combined.getHours();
      const mm = combined.getMinutes();
      horaString = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00`;
    } else {
      // Fecha sin hora; parseDate construye date-only correctamente.
      fechaAvisoDate = parseDate(fecha_aviso);
      horaValue = hora ? combineDateTime(fecha_aviso, hora) : null;
      if (hora) {
        // hora viene como 'HH:mm' ya normalizada desde el cliente
        const parts = String(hora).split(':');
        const hh = parseInt(parts[0] || '0', 10) || 0;
        const mm = parseInt(parts[1] || '0', 10) || 0;
        horaString = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:00`;
      }
    }
    console.log('[POST /api/recordatorios] parsed:', {
      id_pago: id_pago?.toString?.() || id_pago,
      fechaAvisoDate: fechaAvisoDate && fechaAvisoDate.toISOString(),
      horaValue: horaValue && horaValue.toISOString(),
      horaString,
      originalHora: hora,
      fechaIsDateTime,
    });

    // Usar SQL parametrizado para insertar el campo `hora` como tipo `time`
    // y evitar que Prisma intente convertir la cadena a Date (y falle).
    // Hacemos una inserción y luego recuperamos el registro con sus relaciones.
    const insertResult: any = await prisma.$queryRaw`
      INSERT INTO public.recordatorio (fecha_aviso, mensaje, id_pago, hora, notification_id, created_at)
      VALUES (
        ${fechaAvisoDate.toISOString().split('T')[0]}::date,
        ${mensaje || null},
        ${BigInt(id_pago)},
        ${horaString}::time,
        ${notification_id || null},
        now()
      )
      RETURNING id_recordatorio;
    `;

    const insertedId = insertResult && insertResult[0] && insertResult[0].id_recordatorio ? insertResult[0].id_recordatorio : null;

    if (!insertedId) {
      throw new Error('No se pudo insertar el recordatorio');
    }

    const recordatorio = await prisma.recordatorio.findUnique({
      where: { id_recordatorio: BigInt(insertedId) },
      include: { pago: true }
    });

    return NextResponse.json({ recordatorio: serializeBigInt(recordatorio), message: 'Recordatorio creado' });
  } catch (error) {
    console.error('POST /api/recordatorios error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const idRecordatorio = searchParams.get('id');

    if (!idRecordatorio) {
      return NextResponse.json({ error: 'ID de recordatorio requerido' }, { status: 400 });
    }

    // Verificar que el recordatorio pertenece a un pago del usuario
    const recordatorio = await prisma.recordatorio.findUnique({
      where: { id_recordatorio: BigInt(idRecordatorio) },
      include: { pago: true }
    });

    if (!recordatorio || recordatorio.pago.id_usuario !== user.id) {
      return NextResponse.json({ error: 'Recordatorio no encontrado o no autorizado' }, { status: 404 });
    }

    await prisma.recordatorio.delete({
      where: { id_recordatorio: BigInt(idRecordatorio) }
    });

    return NextResponse.json({ message: 'Recordatorio eliminado' });
  } catch (error) {
    console.error('DELETE /api/recordatorios error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
