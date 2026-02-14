"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="flex gap-1"><div className="h-8 w-8" /><div className="h-8 w-8" /><div className="h-8 w-8" /></div>;
  }

  return (
    <div className="flex gap-1">
      <Button
        type="button"
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => setTheme("light")}
        aria-label="라이트 모드"
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => setTheme("dark")}
        aria-label="다크 모드"
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon-sm"
        className="cursor-pointer"
        onClick={() => setTheme("system")}
        aria-label="시스템 모드"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  );
}
