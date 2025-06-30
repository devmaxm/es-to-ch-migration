/**
 * Convert ISO date string to a format suitable for ClickHouse (YYYY-MM-DD HH:MM:SS).
 * 
 * @param isoDate - The ISO formatted date string (e.g., "2023-10-01T12:30:00.000Z")
 * @returns A string representing the date in "YYYY-MM-DD HH:MM:SS" format.
 */
export function convertISOToDateTimeFormat(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toISOString().replace('T', ' ').split('.')[0]; // Remove 'T' and milliseconds
}