export function formatDate(dateString: string): string {
  const date = new Date(Date.parse(dateString));
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
