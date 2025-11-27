"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, CreditCard, DollarSign, Tag } from 'lucide-react';
import { usePayments } from '@/components/context/PaymentContext';
import { parseDate } from '@/utils/formatters';

interface AddPaymentFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

interface PaymentData {
    titulo: string;
    monto: string;
    fecha_vencimiento: string;
    id_categoria: string;
    id_metodo: string;
}

interface Categoria {
    id_categoria: string;
    nombre: string;
    descripcion?: string;
}

interface MetodoPago {
    id_metodo: string;
    tipo: string;
    detalles?: string;
}

export default function AddPaymentForm({ onSuccess, onCancel }: AddPaymentFormProps) {
    const { addPayment, loading: contextLoading, error: contextError } = usePayments();
    
    const [formData, setFormData] = useState<PaymentData>({
        titulo: '',
        monto: '',
        fecha_vencimiento: '',
        id_categoria: '',
        id_metodo: '',
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [metodosPago, setMetodosPago] = useState<MetodoPago[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Cargar categorías y métodos de pago al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [categoriasRes, metodosRes] = await Promise.all([
                    fetch('/api/categorias'),
                    fetch('/api/metodos-pago')
                ]);

                if (categoriasRes.ok) {
                    const categoriasData = await categoriasRes.json();
                    setCategorias(categoriasData.categorias || []);
                }

                if (metodosRes.ok) {
                    const metodosData = await metodosRes.json();
                    setMetodosPago(metodosData.metodos || []);
                }
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoadingData(false);
            }
        };

        cargarDatos();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Get category and payment method names
            const selectedCategoria = categorias.find(c => c.id_categoria === formData.id_categoria);
            const selectedMetodo = metodosPago.find(m => m.id_metodo === formData.id_metodo);

            await addPayment({
                titulo: formData.titulo,
                monto: parseFloat(formData.monto),
                fecha_vencimiento: parseDate(formData.fecha_vencimiento),
                categoria: selectedCategoria?.nombre || '',
                metodo_pago: selectedMetodo?.tipo || '',
                estado: 'Pendiente'
            });

            // Resetear formulario
            setFormData({
                titulo: '',
                monto: '',
                fecha_vencimiento: '',
                id_categoria: '',
                id_metodo: '',
            });

            onSuccess?.();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    Agregar Nuevo Pago
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-3 rounded-md bg-red-50 border border-red-200">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    {/* Título del pago */}
                    <div className="space-y-2">
                        <Label htmlFor="titulo" className="flex items-center gap-2 text-green-600 font-medium text-base">
                            <Tag className="h-4 w-4" />
                            Título del pago
                        </Label>
                        <Input
                            id="titulo"
                            name="titulo"
                            type="text"
                            placeholder="Ej: Netflix, Spotify, Electricidad..."
                            value={formData.titulo}
                            onChange={handleChange}
                            className="h-12 text-base"
                            required
                        />
                    </div>

                    {/* Monto - Fila completa */}
                    <div className="space-y-2">
                        <Label htmlFor="monto" className="flex items-center gap-2 text-green-600 font-medium text-base">
                            <DollarSign className="h-4 w-4" />
                            Monto
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg">
                                $
                            </span>
                            <Input
                                id="monto"
                                name="monto"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={formData.monto}
                                onChange={handleChange}
                                className="pl-8 h-12 text-lg"
                                required
                            />
                        </div>
                    </div>

                    {/* Segunda fila - Fecha y Categoría */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fecha de vencimiento */}
                        <div className="space-y-2">
                            <Label htmlFor="fecha_vencimiento" className="flex items-center gap-2 text-green-600 font-medium text-base">
                                <Calendar className="h-4 w-4" />
                                Fecha de vencimiento
                            </Label>
                            <Input
                                id="fecha_vencimiento"
                                name="fecha_vencimiento"
                                type="date"
                                value={formData.fecha_vencimiento}
                                onChange={handleChange}
                                className="h-12"
                                required
                            />
                        </div>

                        {/* Categoría */}
                        <div className="space-y-2">
                            <Label htmlFor="id_categoria" className="flex items-center gap-2 text-green-600 font-medium text-base">
                                <Tag className="h-4 w-4" />
                                Categoría
                            </Label>
                            <select
                                id="id_categoria"
                                name="id_categoria"
                                value={formData.id_categoria}
                                onChange={handleChange}
                                className="w-full px-3 py-3 h-12 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-base"
                                required
                                disabled={isLoadingData}
                            >
                                <option value="">
                                    {isLoadingData ? 'Cargando...' : 'Seleccionar categoría'}
                                </option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                        {categoria.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Método de pago - Fila completa */}
                    <div className="space-y-2">
                        <Label htmlFor="id_metodo" className="flex items-center gap-2 text-green-600 font-medium text-base">
                            <CreditCard className="h-4 w-4" />
                            Método de pago
                        </Label>
                        <select
                            id="id_metodo"
                            name="id_metodo"
                            value={formData.id_metodo}
                            onChange={handleChange}
                            className="w-full px-3 py-3 h-12 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-base"
                            required
                            disabled={isLoadingData}
                        >
                            <option value="">
                                {isLoadingData ? 'Cargando...' : 'Seleccionar método'}
                            </option>
                            {metodosPago.map((metodo) => (
                                <option key={metodo.id_metodo} value={metodo.id_metodo}>
                                    {metodo.tipo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-6">
                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-medium"
                            disabled={isLoading || isLoadingData}
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Guardando...
                                </div>
                            ) : (
                                <>
                                    Guardar pago
                                </>
                            )}
                        </Button>

                        {onCancel && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onCancel}
                                className="flex-1 h-12 text-base"
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}