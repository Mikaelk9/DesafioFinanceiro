import Header from "./components/layout/Header";
import DashboardCard from "./components/dashboard/DashboardCard";
import FilterButton from "./components/filters/FilterButton";
import { generateNumbers } from "./data/generateNumbers";
import ProgressBar from "./components/progress/ProgressBar";
import NumbersGrid from "./components/grid/NumbersGrid";
import { formatCurrency } from "./utils/formatCurrency";
import { calculateProgress } from "./utils/calculateProgress";

import { useEffect, useState } from "react";

export default function App() {
  const STORAGE_KEY = "financial-challenge-500";

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

  const progress = calculateProgress(totalPaid);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <Header />

        {/* DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

          <DashboardCard
            title="Total Guardado"
            value={`R$ ${formatCurrency(totalPaid)}`}
          />

          <DashboardCard
            title="Separado"
            value={`R$ ${formatCurrency(totalReserved)}`}
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
          <ProgressBar progress={progress} />

        </div>

        <div className="mb-4">
          <p className="text-zinc-400">
            Clique nos números para alterar o status.
          </p>
        </div>

        {/* GRID */}
        <NumbersGrid
          numbers={filteredNumbers}
          toggleStatus={toggleStatus}
        />

      </div>
    </div>
  );
}