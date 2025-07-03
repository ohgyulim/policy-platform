"use client";
import BasicInfoForm from "./components/BasicInfoForm";
import PolicyCard from "./components/PolicyCard";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // 임시 데이터
  // Todo: 백엔드 API에 요청
  const initialData = [
    {
      index: 1,
      likes: false,
      name: "정책1",
      district: "광진구",
      content: "11만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
    {
      index: 2,
      likes: false,
      name: "정책2",
      district: "용산구",
      content: "22만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
    {
      index: 3,
      likes: false,
      name: "정책3",
      district: "종로구",
      content: "33만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
  ];

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  // 임시로 데이터를 3개씩 더 불러오는 함수 (실제로는 API 호출)
  const loadMore = () => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      const newData = new Array(3).fill(0).map((_, i) => ({
        index: data.length + i + 1,
        likes: false,
        name: `정책${data.length + i + 1}`,
        district: ["광진구", "용산구", "종로구"][i % 3],
        content: `${data.length + i + 1}만원 지원함`,
        target: "만 19세 ~ 만 24세 이하",
        startDate: "2024-01-01",
        endDate: "2024-02-02",
      }));
      setData((prev) => [...prev, ...newData]);
      setPage((prev) => prev + 1);
      setLoading(false);
      // 임시로 3페이지까지만
      if (page >= 3) setHasMore(false);
    }, 1000);
  };

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div>
      <section className="text-center py-16 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          서울 청년 정책 추천 서비스
        </h2>
        <p className="text-lg text-gray-600">
          내 조건에 맞는 현재 신청 가능한 정책을 찾아보세요
        </p>
      </section>
      <BasicInfoForm />

      <section className="bg-white p-10 rounded-2xl shadow-md max-w-5xl mx-auto mt-20 pb-30">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          현재 진행 중인 정책
        </h2>
        <div className="flex gap-[20px] flex-wrap">
          {data.map((policy, i) => {
            if (i === data.length - 1) {
              return (
                <div
                  ref={observerRef}
                  key={i}
                  className="w-[calc(33.333%-20px)] pt-10"
                >
                  <PolicyCard policyInfo={policy} />
                </div>
              );
            }
            return (
              <div key={i} className="w-[calc(33.333%-20px)] pt-10">
                <PolicyCard policyInfo={policy} />
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        {!hasMore && (
          <div className="text-center mt-4 text-gray-500">
            더 이상 불러올 정책이 없습니다.
          </div>
        )}
      </section>
    </div>
  );
}
