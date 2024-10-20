"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function AnimatedGenerateButton(props: { disabled: boolean }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Reset after 1 second
  };

  return (
    <Button
      {...props}
      onClick={handleClick}
      className={`rounded-full w-10 p-0 flex items-center justify-center bg-primary text-primary-foreground transition-all duration-300 ease-in-out ${
        isAnimating ? "scale-110" : ""
      }`}
    >
      <span className="sr-only">Generate Image</span>
      <div className="relative">
        <Star className="w-5 h-5" />
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isAnimating ? "animate-ping" : "opacity-0"
          }`}
        >
          <Star className="w-5 h-5" />
        </div>
      </div>
    </Button>
  );
}
