import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
        <Link
          href="/feed.xml"
          className="hover:text-foreground transition-colors"
        >
          RSS
        </Link>
      </div>
    </footer>
  );
}
