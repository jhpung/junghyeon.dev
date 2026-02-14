"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { List, X } from "lucide-react";
import type { TocItem } from "@/lib/toc";

function TocList({
  items,
  activeId,
  onItemClick,
  showIndicator = false,
}: {
  items: TocItem[];
  activeId: string;
  onItemClick?: () => void;
  showIndicator?: boolean;
}) {
  return (
    <ul className="relative space-y-1.5 text-sm">
      {showIndicator && (
        <li
          aria-hidden="true"
          className="absolute left-0 w-0.5 h-5 bg-primary rounded-full transition-all duration-300 ease-out"
          style={{
            top: `${items.findIndex((i) => i.id === activeId) * 28}px`,
            opacity: activeId ? 1 : 0,
          }}
        />
      )}
      {items.map(({ id, text, level }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" });
              onItemClick?.();
            }}
            className={`block transition-colors leading-snug ${
              showIndicator ? "pl-3 " : ""
            }${level === 3 ? "pl-3" : level === 4 ? "pl-6" : ""} ${
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
  );
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
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
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    headings.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  const closeFab = useCallback(() => setFabOpen(false), []);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="hidden xl:block fixed right-[calc(50%-384px-14rem)] top-32 w-52">
        <nav
          aria-label="목차"
          className="max-h-[calc(100vh-10rem)] overflow-y-auto"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            목차
          </p>
          <TocList items={items} activeId={activeId} showIndicator />
        </nav>
      </aside>

      {/* Mobile: collapsible inline TOC */}
      <div className="xl:hidden mb-6">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-toc"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <List className="h-4 w-4" />
          목차
          <span className="text-xs">({mobileOpen ? "닫기" : "열기"})</span>
        </button>
        {mobileOpen && (
          <nav
            id="mobile-toc"
            aria-label="목차"
            className="mt-3 pl-1 border-l-2 border-border ml-2"
          >
            <TocList
              items={items}
              activeId={activeId}
              onItemClick={() => setMobileOpen(false)}
            />
          </nav>
        )}
      </div>

      {/* Mobile: floating button */}
      <div className="xl:hidden fixed bottom-6 right-6 z-50">
        {fabOpen && (
          <nav className="absolute bottom-14 right-0 w-56 max-h-72 overflow-y-auto rounded-lg border border-border bg-card p-3 shadow-lg">
            <TocList items={items} activeId={activeId} onItemClick={closeFab} />
          </nav>
        )}
        <button
          type="button"
          onClick={() => setFabOpen(!fabOpen)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          aria-label={fabOpen ? "목차 닫기" : "목차 열기"}
          aria-expanded={fabOpen}
        >
          {fabOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
        </button>
      </div>
    </>
  );
}
