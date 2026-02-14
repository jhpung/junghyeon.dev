# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Project Conventions

디자인 시스템 상세: `DESIGN_SYSTEM.md` 참조.

### Tech Stack
- Next.js 15 (App Router, RSC) / TypeScript
- Tailwind CSS v4 (CSS-based config, no tailwind.config.ts)
- shadcn/ui (new-york style) + Radix UI
- MDX via `next-mdx-remote` + rehype-pretty-code (Shiki)
- `next-themes` (class 기반 다크모드)
- pnpm

### Styling Rules
- 색상은 CSS 변수 토큰 사용: `bg-primary`, `text-muted-foreground`, `border-border` 등
- 하드코딩된 색상값 사용 금지 (예: `text-gray-500` 대신 `text-muted-foreground`)
- 코드블록 스타일은 rehype-pretty-code가 처리 — 직접 스타일링하지 않음
- 새 UI 컴포넌트는 shadcn/ui CLI(`pnpm dlx shadcn@latest add`)로 추가
- `cn()` 유틸리티로 조건부 클래스 병합

### Component Patterns
- 서버 컴포넌트 기본. 클라이언트 상태/브라우저 API 필요 시에만 `"use client"`
- 테마 연동이 필요한 클라이언트 컴포넌트는 `useTheme()`의 `resolvedTheme` 사용
- variant가 있는 컴포넌트는 CVA(`class-variance-authority`) 패턴 따르기
- 아이콘: `lucide-react` 사용

### File Organization
- 페이지: `src/app/`
- 컴포넌트: `src/components/` (shadcn/ui → `src/components/ui/`)
- 유틸/타입: `src/lib/`
- MDX 콘텐츠: `content/posts/`

### Layout
- 최대 너비 `max-w-2xl` (672px), 중앙 정렬
- 한국어 UI (`lang="ko"`)

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.