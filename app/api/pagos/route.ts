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
    console.log('[API] POST /api/pagos - body:', JSON.stringify(body));
    const { titulo, monto, fecha_vencimiento, id_categoria, id_metodo, categoria, metodo_pago } = body;

    // Validaciones básicas
    if (!titulo || !monto || !fecha_vencimiento) {
      return NextResponse.json(
        { error: 'Título, monto y fecha de vencimiento son requeridos' },
        { status: 400 }
      );
    }

    // Verificar que tenemos categoría y método (ya sea por ID o por nombre)
    if (!id_categoria && !categoria) {
      return NextResponse.json(
        { error: 'Debe especificar una categoría' },
        { status: 400 }
      );
    }

    if (!id_metodo && !metodo_pago) {
      return NextResponse.json(
        { error: 'Debe especificar un método de pago' },
        { status: 400 }
      );
    }

    if (monto <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      );
    }

    // Resolver IDs de categoría y método de pago
    let categoriaId: bigint;
    let metodoId: bigint;

    if (id_categoria) {
      categoriaId = BigInt(id_categoria);
    } else {
      // Buscar categoría por nombre
      const categoriaFound = await prisma.categoria.findFirst({
        where: { nombre: categoria }
      });
      
      if (!categoriaFound) {
        return NextResponse.json(
          { error: `Categoría "${categoria}" no encontrada` },
          { status: 400 }
        );
      }
      
      categoriaId = categoriaFound.id_categoria;
    }

    if (id_metodo) {
      metodoId = BigInt(id_metodo);
    } else {
      // Buscar método de pago por tipo
      const metodoFound = await prisma.metodo_pago.findFirst({
        where: { tipo: metodo_pago }
      });
      
      if (!metodoFound) {
        return NextResponse.json(
          { error: `Método de pago "${metodo_pago}" no encontrado` },
          { status: 400 }
        );
      }
      
      metodoId = metodoFound.id_metodo;
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
        id_categoria: categoriaId,
        id_metodo: metodoId,
        estado: 'Pendiente',
      },
      include: {
        categoria: true,
        metodo_pago: true,
      }
    });

    // Convertir BigInt a string para JSON
    const pagoResponse = serializePago(nuevoPago);
    console.log('[API] POST /api/pagos - response:', JSON.stringify(pagoResponse));

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
    console.log('[API] GET /api/pagos - response count:', pagosResponse.length);
    console.log('[API] GET /api/pagos - sample:', JSON.stringify(pagosResponse.slice(0, 5)));

    return NextResponse.json({ pagos: pagosResponse });

  } catch (error) {
    console.error('Error al obtener pagos:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}