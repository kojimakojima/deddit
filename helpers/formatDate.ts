export function formatDate(date: Date): string {
  const year = date.getFullYear();
  // Get month and day, and add '0' prefix if they are less than 10
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are 0-indexed
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
}
