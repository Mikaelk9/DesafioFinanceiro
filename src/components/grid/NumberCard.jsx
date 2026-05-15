function NumberCard({ number, toggleStatus }) {
  return (
    <button
      onClick={() => toggleStatus(number.id)}
      className={`
        h-16 rounded-2xl font-semibold transition-all duration-200 border
        hover:scale-105 active:scale-95 cursor-pointer

        ${
          number.status === "pending"
            ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
            : number.status === "reserved"
            ? "bg-yellow-400 text-black border-yellow-300"
            : "bg-green-500 text-black border-green-400"
        }
      `}
    >
      {number.value}
    </button>
  );
}

export default NumberCard;