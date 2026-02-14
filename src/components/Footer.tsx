import Link from "next/link";
import { Github, Linkedin, Mail, Rss } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const socialLinks = [
  {
    href: "https://github.com/jhpung",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/junghyeon-pung-1535611b7/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:jhpung.dev@gmail.com",
    icon: Mail,
    label: "이메일",
  },
  {
    href: "/feed.xml",
    icon: Rss,
    label: "RSS",
    internal: true,
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </p>
        <div className="flex items-center gap-1.5">
          {socialLinks.map(({ href, icon: Icon, label, ...rest }) => {
            const cls =
              "inline-flex items-center justify-center h-8 w-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-colors";
            if ("internal" in rest && rest.internal) {
              return (
                <Link key={href} href={href} className={cls} aria-label={label}>
                  <Icon className="h-4 w-4" />
                </Link>
              );
            }
            return (
              <a
                key={href}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto:") ? undefined : "noopener noreferrer"
                }
                className={cls}
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
