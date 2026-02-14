import Link from "next/link";
import { Mail, Rss } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
        <div className="flex items-center gap-2">
          <a
            href="mailto:jhpung.dev@gmail.com"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Mail className="h-3.5 w-3.5" />
            이메일
          </a>
          <Link
            href="/feed.xml"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Rss className="h-3.5 w-3.5" />
            RSS
          </Link>
        </div>
      </div>
    </footer>
  );
}
