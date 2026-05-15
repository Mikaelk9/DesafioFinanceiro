export function generateNumbers() {
  return Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    value: i + 1,
    status: "pending",
  }));
}