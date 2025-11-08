import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const metodosPago = await prisma.metodo_pago.findMany({
      orderBy: {
        tipo: 'asc'
      }
    });

    // Convertir BigInt a string
    const metodosResponse = metodosPago.map(metodo => ({
      ...metodo,
      id_metodo: metodo.id_metodo.toString(),
    }));

    return NextResponse.json({ metodos: metodosResponse });
  } catch (error) {
    console.error('Error al obtener métodos de pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
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
    const { tipo, detalles } = body;

    if (!tipo) {
      return NextResponse.json(
        { error: 'El tipo es requerido' },
        { status: 400 }
      );
    }

    const nuevoMetodo = await prisma.metodo_pago.create({
      data: {
        tipo,
        detalles: detalles || null,
      }
    });

    const metodoResponse = {
      ...nuevoMetodo,
      id_metodo: nuevoMetodo.id_metodo.toString(),
    };

    return NextResponse.json({
      message: 'Método de pago creado exitosamente',
      metodo: metodoResponse
    });
  } catch (error) {
    console.error('Error al crear método de pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}