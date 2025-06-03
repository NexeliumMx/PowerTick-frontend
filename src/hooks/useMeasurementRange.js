import { useQuery } from '@tanstack/react-query';
import { fetchMeasurementRange } from '../services/api/httpRequests';

/**
 * Custom hook to fetch the available measurement range for a powermeter.
 * @param {string|number} powermeter_id - The powermeter ID.
 * @param {string} mode - The environment mode (DEMO, DEV, PRODUCTION).
 * @param {object} options - Optional React Query options.
 * @returns {object} React Query result with { data, isLoading, error }
 */
export function useMeasurementRange(powermeter_id, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['measurementRange', powermeter_id, mode],
    queryFn: () => fetchMeasurementRange(powermeter_id, mode),
    enabled: !!powermeter_id && (options.enabled === undefined ? true : options.enabled),
    staleTime: 1000 * 60 * 10, // 10 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    ...options,
  });
}
