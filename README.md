# junghyeon.dev

개인 기술 블로그 — 개발 노트, 학습 기록, 실험

## 기술 스택

- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS v4** + `@tailwindcss/typography`
- **MDX** (`next-mdx-remote`) + Mermaid 다이어그램
- **Shiki** (`rehype-pretty-code`) 코드 구문 강조
- **next-themes** 다크 모드

## 시작하기

```bash
pnpm install
pnpm dev
```

## 글 작성

`content/posts/` 디렉토리에 `.mdx` 파일을 추가합니다.

```mdx
---
title: "제목"
date: "2026-01-01"
description: "설명"
tags: ["tag1", "tag2"]
published: true
---

본문 내용
```

코드 블록, Mermaid 다이어그램(` ```mermaid `), GFM 문법을 지원합니다.

## 프로젝트 구조

```
content/posts/       # MDX 블로그 글
src/app/             # 페이지 및 라우트
src/components/      # UI 컴포넌트
src/lib/             # 유틸리티 (posts, types, constants)
```

## 배포

Vercel에 연결하면 `main` 브랜치 push 시 자동 배포됩니다.
