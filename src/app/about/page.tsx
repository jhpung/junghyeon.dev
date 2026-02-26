import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiPython,
  SiReact,
  SiNextdotjs,
} from "@icons-pack/react-simple-icons";
import { Cloud } from "lucide-react";

export const metadata: Metadata = {
  title: "소개",
  description: "소프트웨어 엔지니어 풍중현 소개",
};

type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & { size?: number | string }
>;

interface TechItem {
  name: string;
  icon: IconComponent;
  color: string;
}

const primaryStack: TechItem[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "AWS", icon: Cloud as IconComponent, color: "#FF9900" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
];

const experienceStack: TechItem[] = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#888888" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
];

function TechGrid({ items }: { items: TechItem[] }) {
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
      {items.map(({ name, icon: Icon, color }) => (
        <div
          key={name}
          className="group flex items-center gap-2.5 rounded-lg border border-border px-3 py-2.5 text-sm transition-all hover:border-border/80 hover:shadow-sm hover:-translate-y-0.5"
        >
          <Icon
            className="h-5 w-5 shrink-0 transition-colors text-muted-foreground group-hover:text-[--icon-color]"
            style={{ "--icon-color": color } as React.CSSProperties}
          />
          <span className="text-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>소개</h1>
      <p>
        안녕하세요, 6년차 소프트웨어 엔지니어 <strong>풍중현</strong>입니다.
      </p>
      <p>
        현재 <strong>(주)데이블</strong>에서 RMP 광고 시스템의 백엔드를 맡고
        있습니다. 최근에는 AI 에이전트를 활용한 코딩에 관심이 많습니다.
      </p>
      <h2>경력</h2>
      <div className="not-prose relative ml-4 mt-6 mb-8 border-l-2 border-border pl-6 space-y-8">
        {[
          {
            company: "데이블",
            role: "Software Engineer",
            period: "2024.05 ~",
            current: true,
          },
          {
            company: "보살핌",
            role: "Product Engineer",
            period: "2023.05 ~ 2024.03",
          },
          {
            company: "어웨이크코퍼레이션",
            role: "Back-end Developer",
            period: "2022.11 ~ 2023.05",
          },
          {
            company: "더블유클럽",
            role: "Software Engineer",
            period: "2021.03 ~ 2022.11",
          },
        ].map(({ company, role, period, current }) => (
          <div key={company} className="relative">
            <span
              className={`absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 ${current ? "border-primary bg-primary" : "border-border bg-background"}`}
            />
            <p className="text-xs text-muted-foreground font-mono">{period}</p>
            <p className="text-sm font-semibold text-foreground mt-0.5">
              {company}
            </p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        ))}
      </div>

      <h2>기술 스택</h2>
      <h3>주로 사용</h3>
      <TechGrid items={primaryStack} />
      <h3>경험</h3>
      <TechGrid items={experienceStack} />

      <h2>연락처</h2>
      <ul>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/jhpung"
            target="_blank"
            rel="noopener noreferrer"
          >
            @jhpung
          </a>
        </li>
        <li>
          이메일: <a href="mailto:jhpung.dev@gmail.com">jhpung.dev@gmail.com</a>
        </li>
      </ul>
    </div>
  );
}
