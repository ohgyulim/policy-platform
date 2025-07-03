"use client";

import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SeoulModal from "../components/SeoulModal";
import PolicyModal from "../components/PolicyModal";
import { useRouter } from "next/navigation";

export default function PersonalPolicies() {
  const router = useRouter();
  // 상태 저장값
  const [birthDate, setBirthDate] = useState("");
  const [showSeoulModal, setShowSeoulModal] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [incomeLevel, setIncomeLevel] = useState("");
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState([]);

  // enum으로 처리
  const incomeOptions = [
    { label: "150% 이하", value: "below_150" },
    { label: "150% 이상", value: "above_150" },
    { label: "모름", value: "unknown" },
  ];

  // 함수
  const clickSeoulModal = () => setShowSeoulModal((prev) => !prev);
  const clickPolicyModal = () => setShowPolicyModal((prev) => !prev);
  const handleClick = () => {
    if (birthDate == "" || selectedDistrict == "" || incomeLevel == "") {
      alert("값을 채워주세요");
      return;
    }

    const data = {
      birthDate,
      selectedDistrict,
      incomeLevel,
      selectedPolicies,
    };
    localStorage.setItem("userInfo", JSON.stringify(data));
    router.push("/personal-policies/complete");
  };

  // 나이 입력: 만 19 ~ 만 42로 제한
  const minDate = calculateDateYearsAgo(42);
  const maxDate = calculateDateYearsAgo(19);

  return (
    <div>
      <section className="bg-white p-10 rounded-2xl shadow-md max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-8 text-center">
          맞춤 정책 추천을 위해 정보를 입력해주세요
        </h3>

        <div className="space-y-6">
          {/* 생년월일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              생년월일
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              min={minDate}
              max={maxDate}
            />
          </div>

          {/* 거주지 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              거주지(구)
            </label>
            <button
              type="button"
              onClick={clickSeoulModal}
              className="w-full flex justify-between items-center px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500"
            >
              {selectedDistrict || "구 선택"}
            </button>
            {showSeoulModal && (
              <SeoulModal
                clickSeoulModal={clickSeoulModal}
                setSelectedDistrict={setSelectedDistrict}
              />
            )}
          </div>

          {/* 중위소득 수준 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              중위소득 수준
            </label>
            <div className="flex gap-3">
              {incomeOptions.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setIncomeLevel(value)}
                  className={`flex-1 px-4 py-2 rounded-md border text-sm transition ${
                    incomeLevel === value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-600 border-gray-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 현재 참여 중인 정책 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              현재 참여 중인 정책 (선택)
            </label>
            <button
              type="button"
              onClick={clickPolicyModal}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-500"
            >
              <span>검색해서 선택하기</span>
              <IoSearchOutline size={18} className="text-gray-400" />
            </button>

            {/* 선택된 정책 리스트 */}
            {selectedPolicies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedPolicies.map((policy, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm"
                  >
                    {policy}
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedPolicies((prev) =>
                          prev.filter((p) => p !== policy)
                        )
                      }
                      className="ml-1 text-blue-400 hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 모달 */}
          {showPolicyModal && (
            <PolicyModal
              clickPolicyModal={clickPolicyModal}
              setSelectedPolicies={setSelectedPolicies}
            />
          )}
        </div>

        {/* 저장 버튼 */}
        <button
          className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-3 rounded-md transition"
          type="button"
          onClick={handleClick}
        >
          저장하고 추천 받기
        </button>
      </section>
    </div>
  );
}

function calculateDateYearsAgo(years) {
  const currentDate = new Date();
  return new Date(currentDate.setFullYear(currentDate.getFullYear() - years))
    .toISOString()
    .split("T")[0];
}
