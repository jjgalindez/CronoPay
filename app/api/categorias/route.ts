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

    const categorias = await prisma.categoria.findMany({
      orderBy: {
        nombre: 'asc'
      }
    });

    // Convertir BigInt a string
    const categoriasResponse = categorias.map(categoria => ({
      ...categoria,
      id_categoria: categoria.id_categoria.toString(),
    }));

    return NextResponse.json({ categorias: categoriasResponse });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
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
    const { nombre, descripcion } = body;

    if (!nombre) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      );
    }

    const nuevaCategoria = await prisma.categoria.create({
      data: {
        nombre,
        descripcion: descripcion || null,
      }
    });

    const categoriaResponse = {
      ...nuevaCategoria,
      id_categoria: nuevaCategoria.id_categoria.toString(),
    };

    return NextResponse.json({
      message: 'Categoría creada exitosamente',
      categoria: categoriaResponse
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}