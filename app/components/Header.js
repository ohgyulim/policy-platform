"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setData(userInfo);
    }
  }, []);

  return (
    <header className="w-full py-4 px-6 border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/">
          <h1 className="text-lg font-bold text-blue-600">청년정책플랫폼</h1>
        </a>
        <nav className="space-x-4 text-sm text-gray-700">
          <a href="/">홈</a>
          <Link href="/policies">모든 정책 보기</Link>
          {data == null ? (
            <Link href="/personal-policies">맞춤 정책 보기</Link>
          ) : (
            <Link href="/personal-policies/complete">맞춤 정책 보기</Link>
          )}
          <Link href="/likes">찜 목록</Link>
        </nav>
      </div>
    </header>
  );
}
