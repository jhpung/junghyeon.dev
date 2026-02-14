# Design System — junghyeon.dev

## Overview

| 항목 | 값 |
|---|---|
| Framework | Next.js 15 (App Router, RSC) |
| Styling | Tailwind CSS v4 (CSS-based config) |
| UI Library | shadcn/ui (new-york style) |
| Typography | Pretendard Variable / JetBrains Mono |
| Theme | `next-themes` (class 기반, system/light/dark) |
| MDX | `next-mdx-remote` + rehype-pretty-code (Shiki) |
| Icons | Lucide React |

---

## Color Tokens

OKLCH 색공간 기반의 Beige + Terracotta 테마.

### Light Mode

| Token | OKLCH | 용도 |
|---|---|---|
| `--background` | `96.5% 0.008 85` | 페이지 배경 |
| `--foreground` | `25% 0.015 55` | 기본 텍스트 |
| `--primary` | `55% 0.12 45` | 링크, 강조색 (terracotta) |
| `--primary-foreground` | `97% 0.006 85` | primary 위 텍스트 |
| `--secondary` | `93% 0.01 85` | 보조 배경 (태그, 버튼) |
| `--muted` | `93% 0.01 85` | 비활성 배경 |
| `--muted-foreground` | `50% 0.01 55` | 날짜, 메타 텍스트 |
| `--border` | `89% 0.01 85` | 구분선, 테두리 |
| `--ring` | `55% 0.12 45` | 포커스 링 |
| `--destructive` | `55% 0.2 25` | 삭제/오류 |

### Dark Mode

| Token | OKLCH | 변화 |
|---|---|---|
| `--background` | `17% 0.01 55` | 어두운 배경 |
| `--foreground` | `90% 0.008 85` | 밝은 텍스트 |
| `--primary` | `68% 0.12 45` | 밝아진 terracotta |
| `--secondary` | `24% 0.01 55` | 어두운 보조 배경 |
| `--muted-foreground` | `60% 0.008 55` | 약간 밝아진 메타 텍스트 |
| `--border` | `30% 0.01 55` | 어두운 구분선 |

### Tailwind 매핑

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  /* ... */
}
```

`bg-primary`, `text-muted-foreground` 등으로 바로 사용.

---

## Typography

### Font Stack

```css
--font-sans: "Pretendard Variable", "Pretendard", -apple-system,
  BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
  "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;

--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono",
  Menlo, Consolas, monospace;
```

- **본문**: Pretendard Variable (CDN, dynamic subset)
- **코드/태그**: JetBrains Mono

### Prose (MDX 본문)

`@tailwindcss/typography` 플러그인 사용. 커스텀 오버라이드:

| 요소 | Light | Dark |
|---|---|---|
| 링크 색상 | `var(--primary)` | `var(--primary)` |
| 인용구 왼쪽선 | `var(--border)` | `var(--border)` |
| 구분선 | `var(--border)` | `var(--border)` |
| 본문 색상 | 기본값 | `var(--foreground)` |

---

## Layout

```
┌─────────────────────────────────────────┐
│              max-w-2xl px-4             │
│  ┌─────────────────────────────────┐    │
│  │ Header (py-6, border-b)        │    │
│  │ [Logo]            [Nav] [Theme]│    │
│  ├─────────────────────────────────┤    │
│  │ Main (min-h-[60vh] py-8)       │    │
│  │                                 │    │
│  │                                 │    │
│  ├─────────────────────────────────┤    │
│  │ Footer (border-t py-8 mt-16)   │    │
│  │ [©]                      [RSS] │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

- **최대 너비**: `max-w-2xl` (672px), 가운데 정렬
- **본문 영역**: 최소 높이 `60vh`
- **TOC**: `xl:` 이상에서 오른쪽 고정 (`fixed`, `w-52`)

---

## Components

### 기본 UI (shadcn/ui)

#### Button

| Variant | 스타일 |
|---|---|
| `default` | `bg-primary text-primary-foreground` |
| `secondary` | `bg-secondary text-secondary-foreground` |
| `ghost` | 투명, hover 시 `bg-accent` |
| `outline` | 테두리 + 배경 |
| `destructive` | 빨간 배경 |
| `link` | 밑줄 스타일 |

| Size | 높이 |
|---|---|
| `default` | `h-9` |
| `sm` | `h-8` |
| `xs` | `h-6` |
| `lg` | `h-10` |
| `icon` / `icon-sm` / `icon-xs` | 정사각형 |

#### Badge

- `rounded-full`, `px-2 py-0.5 text-xs font-medium`
- Variant: default, secondary, outline, ghost, destructive, link
- `asChild`로 `<Link>` 조합 가능

### 블로그 컴포넌트

#### TagBadge

```tsx
<Badge variant="secondary" className="font-mono" asChild>
  <Link href={`/tags/${tag}`}>#{tag}</Link>
</Badge>
```

- mono 폰트, secondary 배경, `#` 접두사

#### PostCard

- `py-6`, hover 시 `bg-muted/50` 배경
- 제목: `text-lg font-semibold`, hover 시 `text-primary`
- 메타: `text-sm text-muted-foreground`
- 설명: `text-muted-foreground leading-relaxed`

#### PostList

- `divide-y divide-border/60`로 카드 사이 구분선

#### TableOfContents

- `xl:block` (1280px+)에서만 노출
- `fixed`, 우측 배치
- 활성 항목: `text-primary font-medium`
- h3: `pl-3`, h4: `pl-6` 들여쓰기
- IntersectionObserver로 스크롤 추적

#### Comments (giscus)

- 클라이언트 전용, `resolvedTheme` 연동
- `<hr className="my-12" />` 위에 배치

---

## Code Blocks

rehype-pretty-code + Shiki 듀얼 테마 (`github-light` / `github-dark`).

| 요소 | 스타일 |
|---|---|
| `pre` | `border rounded-lg shadow-sm`, 가로 스크롤 |
| 라인 번호 | CSS counter, `text-muted-foreground/50`, `text-xs` |
| 하이라이트 | `blue-200/50` 배경, 왼쪽 `blue-500` 보더 |
| 제목 바 | `bg-gray-100/80`, `text-xs font-mono` |
| 인라인 코드 | `bg-muted rounded px-1.5 py-0.5 text-sm font-mono` |

다크모드에서는 `--shiki-dark` / `--shiki-dark-bg` 변수로 자동 전환.

---

## Theme System

| 설정 | 값 |
|---|---|
| Provider | `next-themes` |
| attribute | `class` (`.dark` 클래스) |
| defaultTheme | `system` |
| 전환 방식 | 3버튼 (Light / Dark / System) |
| 전환 효과 | `background-color 0.3s ease, color 0.3s ease` |

---

## Interaction States

| 상태 | 스타일 |
|---|---|
| Focus | `outline-2 outline-offset-2 outline-ring` |
| Selection | `bg-primary/15` (light) / `bg-primary/30` (dark) |
| Link hover | `text-muted-foreground → text-foreground` |
| Card hover | `bg-muted/50` |
| Button focus | `ring-ring/50 ring-[3px]` |

---

## Spacing Conventions

| 용도 | 값 |
|---|---|
| 페이지 패딩 | `px-4` |
| 섹션 간격 | `py-8` |
| 글 헤더 아래 | `mb-8` |
| 태그 간격 | `gap-2` |
| Footer 위 여백 | `mt-16` |
| 댓글 구분선 | `my-12` |

---

## Border Radius

```css
--radius: 0.5rem;        /* 8px */
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
```

Badge는 `rounded-full`, 나머지 대부분 `rounded-md` 또는 `rounded-lg`.

---

## Dependencies

```
tailwindcss ^4.1.18          @tailwindcss/typography ^0.5.19
tw-animate-css ^1.4.0        next-themes
class-variance-authority      clsx + tailwind-merge
lucide-react                  radix-ui (Slot)
@giscus/react                 mermaid (dynamic import)
rehype-pretty-code            rehype-slug
rehype-autolink-headings      remark-gfm
```

---

## File Structure

```
src/
├── app/
│   ├── globals.css          ← 테마 토큰 + 코드블록 스타일
│   ├── layout.tsx           ← 루트 레이아웃 (max-w-2xl)
│   ├── page.tsx             ← 홈
│   ├── blog/
│   │   ├── page.tsx         ← 글 목록
│   │   └── [slug]/page.tsx  ← 글 상세 + Comments
│   ├── about/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── feed.xml/route.ts
│   └── sitemap.ts
├── components/
│   ├── ui/
│   │   ├── button.tsx       ← CVA 기반 Button
│   │   └── badge.tsx        ← CVA 기반 Badge
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   ├── TagBadge.tsx
│   ├── TableOfContents.tsx
│   ├── MDXComponents.tsx
│   ├── Mermaid.tsx
│   └── Comments.tsx
└── lib/
    ├── constants.ts
    ├── posts.ts             ← MDX 파싱 + rehype 설정
    ├── toc.ts
    ├── types.ts
    └── utils.ts             ← cn() 유틸리티
```
