// Utility functions to format UTC timestamps to local time for chart display
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

// Format UTC hour string (e.g., '2025-06-06T06:00:00.000Z') to local hour (e.g., '00:00')
export function formatHourLocal(utcString) {
  if (!utcString) return '';
  const tz = dayjs.tz.guess();
  return dayjs.utc(utcString).tz(tz).format('HH:mm');
}

// Format UTC day string (e.g., '2025-06-06T06:00:00.000Z') to local day (e.g., 'Jun 06')
export function formatDayLocal(utcString) {
  if (!utcString) return '';
  const tz = dayjs.tz.guess();
  return dayjs.utc(utcString).tz(tz).format('MMM DD');
}

// Format month string (e.g., '2025-06') to month name (e.g., 'Jun')
export function formatMonthLocal(monthString) {
  if (!monthString) return '';
  // monthString: 'YYYY-MM'
  return dayjs(monthString + '-01').format('MMM');
}
