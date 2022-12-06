export function getToday() {
  const data = new Date();
  const yyyy = data.getFullYear();
  const mm = data.getMonth() + 1;
  const dd = data.getDate();
  const result = `${yyyy}-${mm}-${dd}`;
  return result;
}
