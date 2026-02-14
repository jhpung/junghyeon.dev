"use client";

import { useEffect } from "react";

export function CopyButton() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const button = (e.target as HTMLElement).closest(
        "[data-copy-button]",
      ) as HTMLButtonElement | null;
      if (!button) return;

      const figure = button.closest("[data-rehype-pretty-code-figure]");
      const code = figure?.querySelector("code");
      if (!code) return;

      const text = code.innerText;
      navigator.clipboard.writeText(text).then(() => {
        button.setAttribute("data-copied", "true");
        setTimeout(() => {
          button.removeAttribute("data-copied");
        }, 2000);
      });
    }

    function addButtons() {
      document
        .querySelectorAll("[data-rehype-pretty-code-figure]")
        .forEach((figure) => {
          if (figure.querySelector("[data-copy-button]")) return;
          const pre = figure.querySelector("pre");
          if (!pre) return;

          pre.style.position = "relative";

          const btn = document.createElement("button");
          btn.setAttribute("data-copy-button", "");
          btn.setAttribute("aria-label", "코드 복사");
          btn.setAttribute("type", "button");
          btn.className =
            "absolute top-2 right-2 z-10 flex items-center justify-center h-8 w-8 rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-accent transition-all backdrop-blur-sm";
          btn.innerHTML = `<svg data-copy-icon xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><svg data-check-icon class="hidden" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

          pre.appendChild(btn);
          pre.classList.add("group");
        });
    }

    addButtons();

    // Handle dynamic content
    const observer = new MutationObserver(addButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
