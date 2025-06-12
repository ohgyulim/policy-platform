"use client";

import Pagination from "@/app/components/Pagination";
import PolicyCard from "@/app/components/PolicyCard";
import SearchNav from "@/app/components/SearchNav";
import { useState } from "react";

const PAGE_SIZE = 3;

// TODO:
// 1. 매 페이지마다 GET 요청 vs 2. 한번에 데이터 가져와서 페이지네이션
// 2번으로 한다고 하면, data를 PAGE_SIZE만큼 자른 후, 현재 페이지에 맞게 배열 새로 생성해야됨

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

  // 서버에서 받을 값
  const totalPage = initialData.length / PAGE_SIZE;
  const [page, setPage] = useState(1);
  const paged = initialData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div>
      <SearchNav></SearchNav>
      <section className="rounded-2xl max-w-5xl mx-auto pb-30">
        <div className="flex gap-[20px] flex-wrap justify-center">
          {paged.map((data, i) => {
            return (
              <PolicyCard
                className="w-[calc(33.333%-20px)] pt-10"
                key={i}
                policyInfo={data}
              ></PolicyCard>
            );
          })}
        </div>

        <div className="mt-10">
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            onPageChange={setPage}
          ></Pagination>
        </div>
      </section>
    </div>
  );
}
