"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import { X } from "lucide-react";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");
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

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      const isDark = resolvedTheme === "dark";
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        fontFamily: "inherit",
        themeVariables: isDark
          ? {
              primaryColor: "#2d2d2d",
              primaryTextColor: "#ddd",
              primaryBorderColor: "#444",
              lineColor: "#444",
              secondaryColor: "#262626",
              tertiaryColor: "#2a2a2a",
              background: "transparent",
              mainBkg: "#2d2d2d",
              nodeBorder: "#444",
              clusterBkg: "#262626",
              titleColor: "#ddd",
              edgeLabelBackground: "#262626",
              nodeTextColor: "#ddd",
            }
          : {
              primaryColor: "#e8ddd4",
              primaryTextColor: "#3d3028",
              primaryBorderColor: "#d4c4b4",
              lineColor: "#b8a696",
              secondaryColor: "#f0e8e0",
              tertiaryColor: "#f5efe8",
              background: "transparent",
              mainBkg: "#e8ddd4",
              nodeBorder: "#d4c4b4",
              clusterBkg: "#f0e8e0",
              titleColor: "#3d3028",
              edgeLabelBackground: "#f5f0eb",
              nodeTextColor: "#3d3028",
            },
      });

      try {
        const { svg: rendered } = await mermaid.render(
          `mermaid-${id}`,
          chart.trim(),
        );
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setSvg("");
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [chart, id, resolvedTheme]);

  if (!svg) {
    return (
      <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
        다이어그램 로딩 중...
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        role="img"
        aria-label="다이어그램"
        className="my-6 flex cursor-zoom-in justify-center [&>svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
        onClick={() => setOpen(true)}
      />
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="다이어그램 확대"
          >
            <button
              type="button"
              onClick={close}
              className="absolute top-4 right-4 z-10 flex items-center justify-center h-10 w-10 rounded-full bg-background/90 border border-border text-foreground shadow-md hover:bg-accent transition-colors"
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </button>
            <div
              className="relative max-h-[90vh] max-w-[90vw] cursor-zoom-out [&>svg]:max-w-full [&>svg]:max-h-[90vh]"
              dangerouslySetInnerHTML={{ __html: svg }}
              onClick={close}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
