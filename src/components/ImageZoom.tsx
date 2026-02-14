"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export function ImageZoom({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} cursor-zoom-in`}
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <Image
              src={src}
              alt={alt}
              width={width * 2}
              height={height * 2}
              className="max-h-[90vh] w-auto rounded-lg object-contain shadow-2xl cursor-zoom-out"
              onClick={close}
            />
          </div>
        </div>
      )}
    </>
  );
}
