"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, TreePine } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="w-full py-4 px-6 bg-background border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Imagine It</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("light")}
            className={
              theme === "light" ? "bg-primary text-primary-foreground" : ""
            }
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Light theme</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("dark")}
            className={
              theme === "dark" ? "bg-primary text-primary-foreground" : ""
            }
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Dark theme</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("forest")}
            className={
              theme === "forest" ? "bg-primary text-primary-foreground" : ""
            }
          >
            <TreePine className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Forest theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
