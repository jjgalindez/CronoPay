"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileDown,
  Mail,
  FileSpreadsheet,
  Save,
  Loader2,
} from "lucide-react";

interface ReportActionsProps {
  selectedMonth: string;
  totalPagado: number;
  totalPendiente: number;
  onSaveSuccess: () => void;
}

export function ReportActions({
  selectedMonth,
  totalPagado,
  totalPendiente,
  onSaveSuccess,
}: ReportActionsProps) {
  const [saving, setSaving] = useState(false);

  const handleSaveReport = async () => {
    setSaving(true);
    try {
      const [, month] = selectedMonth.split("-").map(Number);

      const response = await fetch("/api/informes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mes: month,
          total_pagado: totalPagado,
          total_pendiente: totalPendiente,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar informe");
      }

      alert(data.message || "Informe guardado exitosamente");
      onSaveSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert(
        error instanceof Error ? error.message : "Error al guardar el informe"
      );
    } finally {
      setSaving(false);
    }
  };

  const exportToPDF = () => {
    alert("Exportación a PDF - Funcionalidad próximamente");
  };

  const exportToExcel = () => {
    alert("Exportación a Excel - Funcionalidad próximamente");
  };

  const exportToEmail = () => {
    alert("Envío por correo - Funcionalidad próximamente");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Acciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handleSaveReport}
          disabled={saving}
          className="w-full justify-start gap-3"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Guardar Informe
            </>
          )}
        </Button>

        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground mb-3">Exportar reporte</p>

          <Button
            onClick={exportToPDF}
            variant="outline"
            className="w-full justify-start gap-3 mb-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            <FileDown className="w-4 h-4" />
            Descargar PDF
          </Button>

          <Button
            onClick={exportToExcel}
            variant="outline"
            className="w-full justify-start gap-3 mb-2 bg-green-50 hover:bg-green-100 dark:bg-green-950/20 dark:hover:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Exportar a Excel
          </Button>

          <Button
            onClick={exportToEmail}
            variant="outline"
            className="w-full justify-start gap-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/20 dark:hover:bg-blue-950/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
          >
            <Mail className="w-4 h-4" />
            Enviar por correo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
