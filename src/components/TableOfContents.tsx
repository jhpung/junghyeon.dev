"use client";

import { useEffect, useRef, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 }
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed right-[calc(50%-384px-14rem)] top-32 w-52">
      <nav className="max-h-[calc(100vh-10rem)] overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          목차
        </p>
        <ul className="space-y-1.5 text-sm">
          {items.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block transition-colors leading-snug ${
                  level === 3 ? "pl-3" : level === 4 ? "pl-6" : ""
                } ${
                  activeId === id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
