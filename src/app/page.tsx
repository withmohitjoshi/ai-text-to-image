"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { AnimatedGenerateButton } from "@/components/AnimatedGenerateButton";
import { FullPageLoader } from "@/components/FullPageLoader";
import Image from "next/image";
import useFetchImage from "@/hook/useFetchImage";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { gsap } from "gsap";

export default function TextToImageGenerator() {
  const [inputText, setInputText] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("");
  const loadingMessageRef = useRef<HTMLSpanElement>(null);

  const { fetchImage, isLoading: isFetchingImage, isError } = useFetchImage();

  const preventDevTools = useCallback(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
      }
    });

    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    preventDevTools();
    if (isFetchingImage) {
      const messages = [
        "Parsing the prompt...",
        "AI is generating image...",
        "Bringing your imagination to life...",
        "Adding final touches...",
        "Refining details...",
        "Enhancing colors...",
        "Adjusting composition...",
        "Applying artistic style...",
        "Finalizing the masterpiece...",
        "Almost there...",
      ];
      let currentIndex = 0;

      const updateMessage = () => {
        setLoadingMessage(messages[currentIndex]);
        currentIndex = (currentIndex + 1) % messages.length;

        if (loadingMessageRef.current) {
          gsap.fromTo(
            loadingMessageRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      };

      updateMessage();
      const intervalId = setInterval(updateMessage, 4000);

      return () => clearInterval(intervalId);
    }
  }, [isFetchingImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedImageUrl("");
    const result = await fetchImage(inputText);
    if (!isError && result) {
      setGeneratedImageUrl(URL.createObjectURL(result));
    }
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      const link = document.createElement("a");
      link.href = generatedImageUrl;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (isLoading) {
    return <FullPageLoader onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6">
            <div className="aspect-square w-full bg-muted rounded-lg mb-6 flex items-center justify-center relative overflow-hidden">
              {generatedImageUrl ? (
                <>
                  <Image
                    src={generatedImageUrl}
                    alt="Generated image"
                    width={1000}
                    height={1000}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  <Button
                    onClick={handleDownload}
                    className="absolute top-2 right-2"
                    size="icon"
                    variant="secondary"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-center">
                  {isFetchingImage ? (
                    <span ref={loadingMessageRef}>{loadingMessage}</span>
                  ) : isError ? (
                    "Error while generating the image"
                  ) : (
                    "Your image will appear here"
                  )}
                </p>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-2" noValidate>
              <Input
                type="text"
                placeholder="Enter your text prompt"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                required
                className="flex-grow"
                spellCheck={false}
              />
              <AnimatedGenerateButton
                disabled={inputText.trim() === "" || isFetchingImage}
              />
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
