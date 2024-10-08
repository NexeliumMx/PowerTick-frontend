// src/utils/formatTimestamp.js
export function formatTimestamp(isoTimestamp) {
  const date = new Date(isoTimestamp);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // This gives you AM/PM 12-hour format
  };

  return date.toLocaleString(undefined, options); // Converts to local time based on the user's browser
}