import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const pago = await prisma.pago.findFirst({
      where: {
        id_pago: BigInt(id),
        id_usuario: user.id,
      },
      include: {
        categoria: true,
        metodo_pago: true,
      },
    });

    if (!pago) {
      return NextResponse.json({ error: 'Pago no encontrado' }, { status: 404 });
    }

    return NextResponse.json(serializePago(pago));
  } catch (error) {
    console.error('Error al obtener el pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    
    // Remove fields that shouldn't be updated directly
    const { id: bodyId, user_id, created_at, ...updateData } = body;

    // Convert fecha_vencimiento to Date if present
    if (updateData.fecha_vencimiento) {
      updateData.fecha_vencimiento = new Date(updateData.fecha_vencimiento);
    }

    const updatedPago = await prisma.pago.update({
      where: {
        id_pago: BigInt(id),
        id_usuario: user.id,
      },
      data: {
        ...updateData,
        updated_at: new Date(),
      },
      include: {
        categoria: true,
        metodo_pago: true,
      },
    });

    return NextResponse.json(serializePago(updatedPago));
  } catch (error) {
    console.error('Error al actualizar el pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await prisma.pago.delete({
      where: {
        id_pago: BigInt(id),
        id_usuario: user.id,
      },
    });

    return NextResponse.json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}