export function formatDue(due: string) {
  const d = new Date(due);
  return isNaN(d.getTime()) ? due : d.toLocaleDateString();
}
