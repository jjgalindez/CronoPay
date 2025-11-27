"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  DollarSign,
  ArrowLeft,
  RefreshCw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { formatDate } from '@/utils/formatters';

interface Informe {
  id_informe: string;
  mes: number;
  total_pagado: number;
  total_pendiente: number;
  created_at: string;
}

export default function SavedReportsPage() {
  const router = useRouter();
  const [informes, setInformes] = useState<Informe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInformes();
  }, []);

  const fetchInformes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/informes");
      const data = await response.json();

      if (response.ok) {
        setInformes(data.informes);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error fetching informes:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getMonthName = (mesKey: number) => {
    const date = new Date(2025, mesKey - 1, 1);
    return date.toLocaleDateString("es-CO", { month: "long" });
  };

  const formatDateWrapper = (dateString: string) => formatDate(dateString);

  const generateInformeText = (informe: Informe) => {
    const total = informe.total_pagado + informe.total_pendiente;
    const completadoPercentage = total > 0 
      ? Math.round((informe.total_pagado / total) * 100) 
      : 0;
    const pendientePercentage = 100 - completadoPercentage;

    let estadoGeneral = "";
    let recomendacion = "";
    let emoji = "";

    if (completadoPercentage >= 90) {
      estadoGeneral = "Excelente gestión financiera";
      recomendacion = "Has completado casi todos tus pagos. ¡Sigue así!";
      emoji = "🎉";
    } else if (completadoPercentage >= 70) {
      estadoGeneral = "Buena gestión de pagos";
      recomendacion = "Estás cumpliendo con la mayoría de tus obligaciones. Continúa con el buen trabajo.";
      emoji = "✅";
    } else if (completadoPercentage >= 50) {
      estadoGeneral = "Gestión moderada";
      recomendacion = "Tienes pendientes importantes. Prioriza los pagos para evitar recargos.";
      emoji = "⚠️";
    } else if (completadoPercentage >= 25) {
      estadoGeneral = "Atención requerida";
      recomendacion = "La mayoría de pagos están pendientes. Revisa tu presupuesto urgentemente.";
      emoji = "⚡";
    } else {
      estadoGeneral = "Situación crítica";
      recomendacion = "Muy pocos pagos completados. Considera reorganizar tus finanzas inmediatamente.";
      emoji = "🚨";
    }

    return {
      estadoGeneral,
      recomendacion,
      emoji,
      completadoPercentage,
      pendientePercentage,
      total
    };
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.push("/protected/reports")}
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Reportes
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">
            Informes Guardados
          </h1>
          <p className="text-muted-foreground mt-2">
            Historial de informes mensuales guardados
          </p>
        </div>

        <Button
          variant="outline"
          onClick={fetchInformes}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </Button>
      </div>

      {/* Lista de informes */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : informes.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No hay informes guardados</p>
              <p className="text-sm mt-2">
                Guarda un informe desde la página de reportes para verlo aquí
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {informes.map((informe) => {
            const analisis = generateInformeText(informe);

            return (
              <Card 
                key={informe.id_informe}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      {getMonthName(informe.mes)}
                    </CardTitle>
                    <Badge variant="outline">
                      {analisis.completadoPercentage}% pagado
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Guardado: {formatDateWrapper(informe.created_at)}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Análisis textual */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{analisis.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-foreground mb-1">
                          {analisis.estadoGeneral}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {analisis.recomendacion}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-medium">Pagado</span>
                      </div>
                      <span className="font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(informe.total_pagado)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium">Pendiente</span>
                      </div>
                      <span className="font-bold text-orange-600 dark:text-orange-400">
                        {formatCurrency(informe.total_pendiente)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold">Total</span>
                      </div>
                      <span className="font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(analisis.total)}
                      </span>
                    </div>
                  </div>

                  {/* Barra de progreso */}
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${analisis.completadoPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Completado</span>
                      <span>{analisis.completadoPercentage}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
