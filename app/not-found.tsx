import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página no encontrada</h1>
            <p className="text-lg text-gray-600 mb-6">Lo sentimos, la página que buscas no existe.</p>
            <Link
                href="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
