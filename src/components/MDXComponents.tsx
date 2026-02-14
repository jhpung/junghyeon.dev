import Image from "next/image";
import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  HTMLAttributes,
  ImgHTMLAttributes,
  ReactElement,
} from "react";
import { Mermaid } from "./Mermaid";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (
    typeof node === "object" &&
    node !== null &&
    "props" in node
  ) {
    const el = node as ReactElement<{ children?: React.ReactNode }>;
    return extractText(el.props.children);
  }
  return "";
}

export const mdxComponents = {
  a: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href?.startsWith("/") || href?.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src || typeof src !== "string") return null;
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={720}
        height={400}
        className="rounded-lg"
      />
    );
  },
  pre: ({ children, ...props }: HTMLAttributes<HTMLPreElement>) => {
    const child = children as ReactElement<{
      className?: string;
      children?: React.ReactNode;
      "data-language"?: string;
    }>;
    if (
      child?.props?.className === "language-mermaid" ||
      child?.props?.["data-language"] === "mermaid"
    ) {
      return <Mermaid chart={extractText(child.props.children)} />;
    }
    return <pre {...props}>{children}</pre>;
  },
  Mermaid,
};
