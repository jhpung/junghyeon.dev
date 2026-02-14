"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "-");
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const mermaid = (await import("mermaid")).default;
      mermaid.initialize({
        startOnLoad: false,
        theme: resolvedTheme === "dark" ? "dark" : "default",
        fontFamily: "inherit",
      });

      try {
        const { svg: rendered } = await mermaid.render(
          `mermaid-${id}`,
          chart.trim()
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
    <div
      ref={containerRef}
      className="my-6 flex justify-center [&>svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
