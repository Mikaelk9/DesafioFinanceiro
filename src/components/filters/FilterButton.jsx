function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-xl transition-all cursor-pointer

        ${active
          ? "bg-white text-black"
          : "bg-zinc-800 hover:bg-zinc-700"
        }
      `}
    >
      {children}
    </button>
  );
}

export default FilterButton