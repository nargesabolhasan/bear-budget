"use client";

import IButton from "@/components/atoms/button";
import Image from "next/image";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-3xl mx-auto">
      <Image
        priority
        unoptimized
        src="/empty.png"
        alt="error"
        width={150}
        height={300}
        style={{ height: "auto" }}
      />
      <h2 className="text-2xl lg:text-3xl font-bold">Something went wrong!</h2>
      <p className="text-gray-500">Please try again later.</p>
      <IButton onClick={reset}>Try again</IButton>
    </div>
  );
}
