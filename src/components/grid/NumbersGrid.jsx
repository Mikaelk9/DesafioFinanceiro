import NumberCard from "./NumberCard";

function NumbersGrid({ numbers, toggleStatus }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
      {numbers.map((number) => (
        <NumberCard
          key={number.id}
          number={number}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
}

export default NumbersGrid;