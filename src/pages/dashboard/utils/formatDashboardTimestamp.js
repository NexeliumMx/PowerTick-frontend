// Utility to format ISO timestamps for dashboard history graphs
// Author: Arturo Vargas
// Date: 2025-05-19

/**
 * Formats an ISO timestamp string to 'HH:mm' (e.g., '19:00')
 * @param {string} isoString - The ISO timestamp string (e.g., '2025-05-18T19:10:00.000Z')
 * @returns {string} - Formatted as 'HH:mm'
 */
export function formatDashboardTimestamp(isoString) {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    // Pad hours and minutes with leading zeros if needed
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } catch (e) {
    return isoString;
  }
}
