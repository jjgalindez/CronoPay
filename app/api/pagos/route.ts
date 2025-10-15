import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// Helper function para convertir BigInt a string
function serializePago(pago: any) {
  return {
    ...pago,
    id_pago: pago.id_pago.toString(),
    id_categoria: pago.id_categoria?.toString(),
    id_metodo: pago.id_metodo?.toString(),
    monto: pago.monto.toString(),
    categoria: pago.categoria ? {
      ...pago.categoria,
      id_categoria: pago.categoria.id_categoria.toString()
    } : null,
    metodo_pago: pago.metodo_pago ? {
      ...pago.metodo_pago,
      id_metodo: pago.metodo_pago.id_metodo.toString()
    } : null,
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener datos del cuerpo de la petición
    const body = await request.json();
    const { titulo, monto, fecha_vencimiento, id_categoria, id_metodo } = body;

    // Validaciones básicas
    if (!titulo || !monto || !fecha_vencimiento || !id_categoria || !id_metodo) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    if (monto <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      );
    }

    // Verificar si el usuario existe en la tabla usuarios_perfil
    let usuarioPerfil = await prisma.usuarios_perfil.findUnique({
      where: { id: user.id }
    });

    // Si no existe, crearlo
    if (!usuarioPerfil) {
      usuarioPerfil = await prisma.usuarios_perfil.create({
        data: {
          id: user.id,
          email: user.email || '',
          nombre: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
          avatar_url: user.user_metadata?.avatar_url || '',
        }
      });
    }

    // Crear el pago
    const nuevoPago = await prisma.pago.create({
      data: {
        titulo: titulo,
        monto: parseFloat(monto),
        fecha_vencimiento: new Date(fecha_vencimiento),
        id_usuario: user.id,
        id_categoria: BigInt(id_categoria),
        id_metodo: BigInt(id_metodo),
        estado: 'Pendiente',
      },
      include: {
        categoria: true,
        metodo_pago: true,
      }
    });

    // Convertir BigInt a string para JSON
    const pagoResponse = serializePago(nuevoPago);

    return NextResponse.json({
      message: 'Pago creado exitosamente',
      pago: pagoResponse
    });

  } catch (error) {
    console.error('Error al crear pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verificar autenticación
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener pagos del usuario
    const pagos = await prisma.pago.findMany({
      where: {
        id_usuario: user.id
      },
      include: {
        categoria: true,
        metodo_pago: true,
      },
      orderBy: {
        fecha_vencimiento: 'asc'
      }
    });

    // Convertir BigInt a string para JSON
    const pagosResponse = pagos.map(pago => serializePago(pago));

    return NextResponse.json({ pagos: pagosResponse });

  } catch (error) {
    console.error('Error al obtener pagos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}