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
