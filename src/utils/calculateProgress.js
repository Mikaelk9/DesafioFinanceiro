export function calculateProgress(totalPaid) {
  return ((totalPaid / 125250) * 100).toFixed(1);
}