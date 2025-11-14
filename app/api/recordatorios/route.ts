import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

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
      orderBy: { fecha_aviso: 'asc' }
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
    const { id_pago, fecha_aviso, mensaje } = body;

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

    const recordatorio = await prisma.recordatorio.create({
      data: {
        id_pago: BigInt(id_pago),
        fecha_aviso: new Date(fecha_aviso),
        mensaje: mensaje || null
      },
      include: {
        pago: true
      }
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
