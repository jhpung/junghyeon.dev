import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "소프트웨어 엔지니어 Junghyeon 소개",
};

export default function AboutPage() {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1>소개</h1>
      <p>
        안녕하세요, 소프트웨어 엔지니어 <strong>Junghyeon</strong>입니다.
      </p>
      <p>
        이 블로그는 개발하면서 배운 것들, 기술적인 실험, 그리고 엔지니어링에
        대한 생각을 기록하는 공간입니다.
      </p>
      <h2>관심 분야</h2>
      <ul>
        <li>웹 프론트엔드 / 풀스택 개발</li>
        <li>개발자 경험 (DX)</li>
        <li>시스템 설계</li>
      </ul>
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
          이메일:{" "}
          <a href="mailto:jhpung.dev@gmail.com">jhpung.dev@gmail.com</a>
        </li>
      </ul>
    </div>
  );
}
