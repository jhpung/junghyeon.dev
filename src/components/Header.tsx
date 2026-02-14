"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";

const navLinks = [
  { href: "/blog", label: "블로그" },
  { href: "/about", label: "소개" },
];

const githubUrl = "https://github.com/jhpung";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-6 border-b border-border">
      <Link
        href="/"
        className="font-mono text-lg sm:text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
      >
        {`{${SITE_NAME}}`}
      </Link>

      {/* Desktop nav */}
      <nav
        aria-label="메인 네비게이션"
        className="hidden sm:flex items-center gap-6"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <GitHubIcon className="h-5 w-5" />
        </a>
        <ThemeToggle />
      </nav>

      {/* Mobile nav */}
      <div className="flex sm:hidden items-center gap-2">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="메뉴 열기">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="px-6 py-8">
            <SheetTitle className="sr-only">네비게이션 메뉴</SheetTitle>
            <nav className="flex flex-col gap-1 mt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-3 border-border" />
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <GitHubIcon className="h-5 w-5" />
                GitHub
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
