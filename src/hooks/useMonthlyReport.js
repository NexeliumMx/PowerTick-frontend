import { useQuery } from '@tanstack/react-query';
import { fetchMonthlyReport } from '../api/httpRequests';

/**
 * Custom hook to fetch demand history for a powermeter and user, given a time range.
 * @param {string} user_id
 * @param {string|number} powermeter_id
 * @param {string|number} year 
 * @param {string} mode - DEMO, DEV, PRODUCTION
 * @returns {object} React Query result
 */
export function useMonthlyReport(user_id, powermeter_id, year, mode = 'PRODUCTION', options = {}) {
  const formattedYear = String(year); // Ensure year is a string

  return useQuery({
    queryKey: ['monthlyReport', user_id, powermeter_id, formattedYear, mode],
    queryFn: () => fetchMonthlyReport(user_id, powermeter_id, formattedYear, mode),
    enabled: !!user_id && !!powermeter_id && !!formattedYear && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}
