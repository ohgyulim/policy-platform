"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Pagination from "./Pagination";

const policies = [
  "청년수당",
  "청년월세지원",
  "내일채움공제",
  "청년도약계좌",
  "청년내일저축계좌",
  // Todo: 서버로 요청
];

// 한 페이지당 보여줄 정책 개수
const PAGE_SIZE = 5;

export default function PolicyModal({ clickPolicyModal, setSelectedPolicies }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  // 검색 및 페이징 적용
  const filtered = policies.filter((p) => p.includes(search));
  const totalPage = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSelect = (policy) => {
    if (selected.includes(policy)) {
      setSelected(selected.filter((p) => p !== policy));
      console.log("이미 있음:   ->   " + selected);
    } else {
      setSelected([...selected, policy]);
      console.log("새로 추가:   ->   " + selected);
    }
  };

  const handleRemove = (policy) => {
    setSelected(selected.filter((p) => p !== policy));
    console.log("지우기:     ->    " + selected);
  };

  const handleComplete = () => {
    setSelectedPolicies(selected);
    clickPolicyModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center"
      onClick={(e) => {
        // 클릭한 대상이 '배경 그 자체'일 때만 닫기
        if (e.target === e.currentTarget) {
          clickPolicyModal();
        }
      }}
    >
      <div
        className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-lg p-8"
        // onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기(X) 버튼 */}
        <button
          className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-blue-500"
          onClick={clickPolicyModal}
          aria-label="닫기"
        >
          <IoClose size={28} />
        </button>
        {/* 타이틀 */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">정책 검색</h2>
        {/* 검색창 */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="정책명 검색"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 bg-gray-50 focus:outline-none focus:border-blue-400 text-base"
          />
        </div>
        {/* 선택된 정책(태그) */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {selected.map((policy) => (
              <span
                key={policy}
                className="flex items-center bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-medium"
              >
                {policy}
                <button
                  className="ml-1 text-blue-400 hover:text-blue-700"
                  onClick={() => handleRemove(policy)}
                  aria-label="선택 해제"
                  type="button"
                >
                  <IoClose size={16} />
                </button>
              </span>
            ))}
          </div>
        )}
        {/* 정책 리스트 */}
        <ul className="mb-6">
          {paged.map((policy) => (
            <li
              key={policy}
              className={`rounded-lg px-4 py-2 cursor-pointer transition ${
                selected.includes(policy)
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(policy)}
            >
              {policy}
            </li>
          ))}
          {paged.length === 0 && (
            <li className="text-gray-400 text-center py-6">
              검색 결과가 없습니다.
            </li>
          )}
        </ul>
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          onPageChange={setPage}
        />
        ;{/* 완료 버튼 */}
        <button
          className="cursor-pointer w-full py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition"
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
    </div>
  );
}
