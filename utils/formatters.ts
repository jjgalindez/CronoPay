
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
	const d = parseDate(fecha);
	if (!hora) return d;
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

