"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryData {
  labels: string[];
  values: number[];
  total: number;
}

interface CategoryChartProps {
  categoryData: CategoryData;
  formatCurrency: (amount: number) => string;
}

export function CategoryChart({ categoryData, formatCurrency }: CategoryChartProps) {
  const chartData = {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.values,
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(234, 179, 8, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const percentage = categoryData.total > 0
              ? ((value / categoryData.total) * 100).toFixed(1)
              : "0";
            return `${label}: ${formatCurrency(value)} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Pagos por Categoría</CardTitle>
      </CardHeader>
      <CardContent>
        {categoryData.labels.length > 0 ? (
          <div className="h-64">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No hay datos para mostrar</p>
            </div>
          </div>
        )}

        {categoryData.labels.length > 0 && (
          <div className="mt-4 space-y-2">
            {categoryData.labels.slice(0, 3).map((label, index) => {
              const percentage =
                ((categoryData.values[index] / categoryData.total) * 100).toFixed(1);
              return (
                <div key={label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: chartData.datasets[0].backgroundColor[index],
                      }}
                    />
                    <span className="truncate">{label}</span>
                  </div>
                  <span className="font-semibold">{percentage}%</span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
