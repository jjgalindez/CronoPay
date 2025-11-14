"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useMemo } from "react";

interface MonthSelectorProps {
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  onRefresh: () => void;
}

export function MonthSelector({ selectedMonth, onMonthChange, onRefresh }: MonthSelectorProps) {
  const availableMonths = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const label = date.toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
      });
      months.push({ value, label });
    }
    return months;
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {availableMonths.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        className="gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        Actualizar
      </Button>
    </div>
  );
}
