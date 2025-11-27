
/**
 * Utilities para parseo y formateo de fechas evitando el desfase por zonas horarias
 * cuando la fecha viene en formato `YYYY-MM-DD` (date-only).
 */

export function parseDate(date: Date | string): Date {
	if (date instanceof Date) return date;
	if (typeof date !== 'string') return new Date(String(date));

	// Fecha solo (YYYY-MM-DD) -> construir en timezone local
	const isoDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(date);
	if (isoDateOnly) {
		const [y, m, d] = date.split('-').map((v) => parseInt(v, 10));
		return new Date(y, m - 1, d);
	}

	// Si viene un timestamp UTC a la medianoche (ej. 2025-12-16T00:00:00.000Z)
	// tratarlo como una fecha 'date-only' y construir en zona local para evitar
	// que la conversión a zona local desplaze el día hacia atrás.
	const midnightUtc = /^\d{4}-\d{2}-\d{2}T00:00:00(?:\.\d+)?Z$/.test(date);
	if (midnightUtc) {
		const [y, m, d] = date.split('T')[0].split('-').map((v) => parseInt(v, 10));
		return new Date(y, m - 1, d);
	}

	// Si viene timestamp completo (con hora distinta de 00:00 UTC), usar el constructor normal
	return new Date(date);
}

/**
 * Combina una fecha (date-only o timestamp) con una hora opcional (HH:mm)
 * y devuelve un objeto Date en la zona local.
 */
export function combineDateTime(fecha: Date | string, hora?: string | null): Date {
	// fecha: date-only or timestamp; hora: either "HH:mm" or an ISO datetime string
	if (!hora) return parseDate(fecha);
	// If hora looks like a full ISO datetime, parse and return that instant
	if (typeof hora === 'string' && /\dT\d/.test(hora)) {
		return parseDate(hora);
	}
	// Otherwise expect a simple HH:mm string
	const d = parseDate(fecha);
	const parts = hora.split(':');
	const hh = parseInt(parts[0] || '0', 10);
	const mm = parseInt(parts[1] || '0', 10);
	d.setHours(hh, mm, 0, 0);
	return d;
}

export function formatDate(date: Date | string, locale = 'es-CO'): string {
	const d = parseDate(date);
	return d.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
}

export function formatTimeFromString(hora: string | null | undefined, locale = 'es-CO'): string {
	if (!hora) return '';
	// hora expected like HH:mm or HH:mm:ss
	const parts = hora.split(':');
	const hh = parseInt(parts[0] || '0', 10);
	const mm = parseInt(parts[1] || '0', 10);
	const d = new Date();
	d.setHours(hh, mm, 0, 0);
	return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

/**
 * Formatea la hora de un recordatorio garantizando el wall-clock esperado.
 * Acepta `hora` en formato `HH:mm` o como ISO datetime (contiene 'T').
 * Si `hora` es ISO, se parsea y se formatea en la zona local del runtime.
 * Si `hora` es `HH:mm`, se combina con `fecha` (date-only) y se formatea.
 */
export function formatReminderTime(fecha: Date | string, hora?: string | null, locale = 'es-CO') {
	if (!hora) return '';
	// Si hora contiene un ISO datetime, parsearlo directamente
	if (typeof hora === 'string' && /\dT\d/.test(hora)) {
		const d = parseDate(hora);
		return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
	}

	// hora expected like HH:mm
	const parts = (hora || '').split(':');
	const hh = parseInt(parts[0] || '0', 10);
	const mm = parseInt(parts[1] || '0', 10);
	const d = parseDate(fecha);
	d.setHours(hh, mm, 0, 0);
	return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
}

/**
 * Normaliza una cadena de hora que puede venir en formato 12h (con AM/PM)
 * o 24h y devuelve una cadena `HH:mm` en 24h.
 * Ejemplos aceptados: "10:15", "10:15 AM", "10:15PM", "1:05 pm", "01:05".
 */
export function parseTimeTo24(horaRaw?: string | null): string | null {
	if (!horaRaw) return null;
	let s = String(horaRaw).trim();
	// Detect AM/PM
	const ampmMatch = s.match(/(am|pm)$/i);
	if (ampmMatch) {
		// Remove AM/PM and parse
		const ampm = ampmMatch[1].toLowerCase();
		s = s.replace(/(am|pm)$/i, '').trim();
		const parts = s.split(':').map(p => p.trim());
		let hh = parseInt(parts[0] || '0', 10);
		const mm = parseInt(parts[1] || '0', 10) || 0;
		if (ampm === 'pm' && hh < 12) hh += 12;
		if (ampm === 'am' && hh === 12) hh = 0;
		return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
	}

	// Otherwise assume already HH:mm or HH:mm:ss
	const parts = s.split(':');
	const hh = parseInt(parts[0] || '0', 10) || 0;
	const mm = parseInt(parts[1] || '0', 10) || 0;
	return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function formatDateTime(fecha: Date | string, hora?: string | null, locale = 'es-CO') {
	const combined = combineDateTime(fecha, hora);
	const datePart = combined.toLocaleDateString(locale, {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	});
	const timePart = combined.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
	return `${datePart}, ${timePart}`;
}

export default {
	parseDate,
	combineDateTime,
	formatDate,
	formatTimeFromString,
	formatDateTime,
};

