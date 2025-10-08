"use client";

import { useTheme } from "@/components/context/ThemeContext";

export function ThemeSwitcherBacground() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button
        className={`px-4 py-2 rounded ${
          theme === "light" ? "bg-gray-800 text-white" : "bg-yellow-400 text-black"
        }`}
        onClick={toggleTheme}
      >
        Cambiar tema
      </button>
    </div>
  );
}
