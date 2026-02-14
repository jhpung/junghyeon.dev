"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="jhpung/junghyeon.dev"
      repoId="R_kgDORQAi3w"
      category="Announcements"
      categoryId="DIC_kwDORQAi384C2ZyM"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      lang="ko"
    />
  );
}
