export default function Pagination({ totalPage, currentPage, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-6">
      <button
        className="bg-white w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &laquo;
      </button>
      {[...Array(totalPage)].map((_, idx) => (
        <button
          type="button"
          key={idx}
          className={`w-8 h-8 flex items-center justify-center rounded ${
            currentPage === idx + 1
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      <button
        type="button"
        className="bg-white w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-100"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    </div>
  );
}
