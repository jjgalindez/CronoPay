import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'bigint') return obj.toString();
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

    const { searchParams } = new URL(request.url);
    const mes = searchParams.get('mes'); // Filtrar por mes opcional

    const where: any = { id_usuario: user.id };
    if (mes) {
      where.mes = parseInt(mes);
    }

    const informes = await prisma.informe.findMany({
      where,
      orderBy: { mes: 'desc' }
    });

    return NextResponse.json({ informes: serializeBigInt(informes) });
  } catch (error) {
    console.error('GET /api/informes error:', error);
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
    const { mes, total_pagado, total_pendiente } = body;

    if (mes === undefined || typeof mes !== 'number' || mes < 1 || mes > 12) {
      return NextResponse.json({ error: 'Mes inválido (debe ser 1-12)' }, { status: 400 });
    }

    // Verificar si ya existe un informe para este mes y usuario
    const existente = await prisma.informe.findFirst({
      where: {
        id_usuario: user.id,
        mes: mes
      }
    });

    if (existente) {
      // Actualizar el existente
      const actualizado = await prisma.informe.update({
        where: { id_informe: existente.id_informe },
        data: {
          total_pagado: total_pagado !== undefined ? parseFloat(total_pagado) : undefined,
          total_pendiente: total_pendiente !== undefined ? parseFloat(total_pendiente) : undefined
        }
      });
      return NextResponse.json({ informe: serializeBigInt(actualizado), message: 'Informe actualizado' });
    }

    // Crear nuevo informe
    const informe = await prisma.informe.create({
      data: {
        mes,
        id_usuario: user.id,
        total_pagado: total_pagado ? parseFloat(total_pagado) : 0,
        total_pendiente: total_pendiente ? parseFloat(total_pendiente) : 0
      }
    });

    return NextResponse.json({ informe: serializeBigInt(informe), message: 'Informe creado' });
  } catch (error) {
    console.error('POST /api/informes error:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
