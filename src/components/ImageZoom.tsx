"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

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
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={alt}
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-background/90 border border-border text-foreground shadow-md hover:bg-accent transition-colors"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
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
          </div>,
          document.body,
        )}
    </>
  );
}
