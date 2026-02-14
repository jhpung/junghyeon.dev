"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="jhpung/junghyeon.dev"
      repoId=""
      category="Announcements"
      categoryId=""
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="ko"
    />
  );
}
