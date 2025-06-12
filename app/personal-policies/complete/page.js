"use client";

import PolicyCard from "@/app/components/PolicyCard";
import SearchNav from "@/app/components/SearchNav";
import { useState } from "react";

export default function Complete() {
  // 임시 데이터
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
    {
      index: 4,
      likes: false,
      name: "정책4",
      district: "종로구",
      content: "44만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
    {
      index: 5,
      likes: false,
      name: "정책5",
      district: "종로구",
      content: "55만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
    {
      index: 6,
      likes: false,
      name: "정책6",
      district: "종로구",
      content: "66만원 지원함",
      target: "만 19세 ~ 만 24세 이하",
      startDate: "2024-01-01",
      endDate: "2024-02-02",
    },
  ];

  return (
    <div>
      <SearchNav></SearchNav>
      <section className="p-10 rounded-2xl max-w-5xl mx-auto pb-30">
        <div className="flex gap-[20px] flex-wrap">
          {initialData.map((data, i) => {
            return (
              <PolicyCard
                className="w-[calc(33.333%-20px)] pt-10"
                key={i}
                policyInfo={data}
              ></PolicyCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
