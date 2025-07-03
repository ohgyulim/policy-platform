export default function PersonalPoliciesLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
        맞춤 정책 보기
      </h2>
      {children}
    </div>
  );
}
