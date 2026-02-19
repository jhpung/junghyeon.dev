import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "페이지를 찾을 수 없습니다",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-bold font-mono text-primary">404</p>
      <p className="mt-4 text-lg text-muted-foreground">
        페이지를 찾을 수 없습니다
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      >
        &larr; 홈으로 돌아가기
      </Link>
    </div>
  );
}
