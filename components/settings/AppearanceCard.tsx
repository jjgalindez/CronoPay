"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Palette, Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";

export function AppearanceCard() {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Apariencia
        </CardTitle>
        <CardDescription>
          Personaliza el tema de la aplicación
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tema</Label>
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => setTheme("light")}
            >
              <Sun className="w-4 h-4" />
              Claro
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => setTheme("dark")}
            >
              <Moon className="w-4 h-4" />
              Oscuro
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="w-full gap-2"
              onClick={() => setTheme("system")}
            >
              <Laptop className="w-4 h-4" />
              Sistema
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
