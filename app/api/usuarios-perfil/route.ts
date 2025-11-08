import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// Helper: convierte BigInt en strings (recursivo simple)
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
		const { searchParams } = new URL(request.url);
		const idParam = searchParams.get('id');

		// Si se pide un perfil por id en query, lo devolvemos públicamente (si existe)
		if (idParam) {
			const perfil = await prisma.usuarios_perfil.findUnique({
				where: { id: idParam }
			});

			if (!perfil) {
				return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 });
			}

			return NextResponse.json({ perfil: serializeBigInt(perfil) });
		}

		// Si no se indica id, obtenemos el usuario autenticado y devolvemos su perfil
		const supabase = await createClient();
		const { data: { user }, error: authError } = await supabase.auth.getUser();

		if (authError || !user) {
			return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
		}

		const perfil = await prisma.usuarios_perfil.findUnique({ where: { id: user.id } });

		if (!perfil) {
			return NextResponse.json({ error: 'Perfil no encontrado' }, { status: 404 });
		}

		return NextResponse.json({ perfil: serializeBigInt(perfil) });

	} catch (error) {
		console.error('GET /api/usuarios-perfil error:', error);
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
			const { email, nombre, avatar_url } = body;

			// Validaciones mínimas
			if (email && typeof email !== 'string') {
				return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
			}

			// Hacemos upsert: crear si no existe, actualizar si existe
			const perfil = await prisma.usuarios_perfil.upsert({
				where: { id: user.id },
				create: {
					id: user.id,
					email: email || user.email || '',
					nombre: nombre || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuario',
					avatar_url: avatar_url || user.user_metadata?.avatar_url || '',
				},
				update: {
					email: email ?? undefined,
					nombre: nombre ?? undefined,
					avatar_url: avatar_url ?? undefined,
				}
			});

		return NextResponse.json({ perfil: serializeBigInt(perfil), message: 'Perfil actualizado' });

	} catch (error) {
		console.error('POST /api/usuarios-perfil error:', error);
		return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
	}
}

