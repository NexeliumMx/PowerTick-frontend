// Utility to format ISO timestamps for dashboard history graphs
// Author: Arturo Vargas
// Date: 2025-05-19

/**
 * Formats a dashboard timestamp string based on the interval type.
 * @param {string} raw - The timestamp or range string.
 * @param {'day'|'month'|'year'} [interval] - The interval type.
 * @returns {string} - Formatted label for the dashboard.
 */
export function formatDashboardTimestamp(raw, interval) {
  if (!raw) return '';
  try {
    if (interval === 'day' && /\d{4}-\d{2}-\d{2} \d{2}:\d{2}-\d{2}:\d{2}/.test(raw)) {
      // e.g. '2025-05-18 20:00-21:00' → convert to local time range
      const [datePart, rangePart] = raw.split(' ');
      const [start, end] = rangePart.split('-');
      // Convert start and end to local time
      const startDate = new Date(`${datePart}T${start}:00Z`);
      const endDate = new Date(`${datePart}T${end}:00Z`);
      const startHours = String(startDate.getHours()).padStart(2, '0');
      const startMinutes = String(startDate.getMinutes()).padStart(2, '0');
      const endHours = String(endDate.getHours()).padStart(2, '0');
      const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
      return `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
    }
    if (interval === 'month' && /\d{4}-\d{2}-\d{2}/.test(raw)) {
      // e.g. '2025-04-19' → 'Apr 19'
      const date = new Date(raw);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
    if (interval === 'year' && /\d{4}-\d{2}/.test(raw)) {
      // e.g. '2024-05' → 'May 2024'
      const [year, month] = raw.split('-');
      const date = new Date(`${raw}-01`);
      return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    }
    // Default: ISO string (for histories)
    const date = new Date(raw);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    return raw;
  }
}
