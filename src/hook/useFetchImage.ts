import { useState } from "react";

const useFetchImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchImage = async (inputText: string) => {
    if (!inputText) return;

    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: inputText,
            parameters: {
              num_inference_steps: 6,
              guidance_scale: 3,
            },
          }),
        }
      );
      return await response.blob();
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchImage, isLoading, isError };
};

export default useFetchImage;
