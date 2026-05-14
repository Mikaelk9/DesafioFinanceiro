import { useEffect, useState } from "react";

export default function App() {
  const STORAGE_KEY = "financial-challenge-500";

  // Gera os 500 números
  const generateNumbers = () => {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      value: i + 1,
      status: "pending",
    }));
  };

  // Estado inicial
  const [numbers, setNumbers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : generateNumbers();
  });

  const [filter, setFilter] = useState("all");

  // Salva no localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(numbers));
  }, [numbers]);

  // Alterna status
  const toggleStatus = (id) => {
    setNumbers((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        const nextStatus =
          item.status === "pending"
            ? "reserved"
            : item.status === "reserved"
              ? "paid"
              : "pending";

        return {
          ...item,
          status: nextStatus,
        };
      })
    );
  };

  // Reset
  const resetProgress = () => {
    const confirmReset = window.confirm(
      "Deseja resetar todo o progresso?"
    );

    if (!confirmReset) return;

    setNumbers(generateNumbers());
  };

  // Filtros
  const filteredNumbers = numbers.filter((item) => {
    if (filter === "all") return true;

    return item.status === filter;
  });

  // Estatísticas
  const paidNumbers = numbers.filter(
    (item) => item.status === "paid"
  );

  const reservedNumbers = numbers.filter(
    (item) => item.status === "reserved"
  );

  const pendingNumbers = numbers.filter(
    (item) => item.status === "pending"
  );

  const totalPaid = paidNumbers.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const totalReserved = reservedNumbers.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const progress = ((totalPaid / 125250) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3 md:text-6xl">
            100K
          </h1>

          <p className="text-zinc-400 mb-1">
            Transforme investimentos em progresso visual.
          </p>
          <p className="text-zinc-400">
            Cada aporte é um passo rumo aos seus primeiros R$100 mil em patrimônio.
          </p>
        </div>

        {/* DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          <DashboardCard
            title="Total Guardado"
            value={`R$ ${totalPaid.toLocaleString("pt-BR")}`}
          />

          <DashboardCard
            title="Separado"
            value={`R$ ${totalReserved.toLocaleString("pt-BR")}`}
          />

          <DashboardCard
            title="Pagos"
            value={`${paidNumbers.length}/500`}
          />

          <DashboardCard
            title="Progresso"
            value={`${progress}%`}
          />
        </div>

        {/* CONTROLES */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-8">

          <div className="flex flex-wrap gap-3 mb-5">

            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
            >
              Todos
            </FilterButton>

            <FilterButton
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
            >
              Pendentes ({pendingNumbers.length})
            </FilterButton>

            <FilterButton
              active={filter === "reserved"}
              onClick={() => setFilter("reserved")}
            >
              Reservados ({reservedNumbers.length})
            </FilterButton>

            <FilterButton
              active={filter === "paid"}
              onClick={() => setFilter("paid")}
            >
              Pagos ({paidNumbers.length})
            </FilterButton>

            <button
              onClick={resetProgress}
              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition cursor-pointer"
            >
              Resetar
            </button>
          </div>

          {/* Barra de progresso */}
          <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="text-zinc-400">
            Clique nos números para alterar o status.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">

          {filteredNumbers.map((number) => (
            <button
              key={number.id}
              onClick={() => toggleStatus(number.id)}
              className={`
                h-16 rounded-2xl font-semibold transition-all duration-200 border
                hover:scale-105 active:scale-95 cursor-pointer

                ${number.status === "pending"
                  ? "bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                  : number.status === "reserved"
                    ? "bg-yellow-400 text-black border-yellow-300"
                    : "bg-green-500 text-black border-green-400"
                }
              `}
            >
              {number.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// COMPONENTE CARD
function DashboardCard({ title, value }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
      <p className="text-zinc-400 text-sm mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}

// COMPONENTE FILTRO
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