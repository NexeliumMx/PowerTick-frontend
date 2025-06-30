/**
 * FileName: src/hooks/usePowermetersByUserAccess.js
 * Author(s): Arturo Vargas
 * Brief: Custom hook to fetch powermeters by user access.
 * Date: 2025-06-01
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchPowermetersByUserAccess } from '../api/httpRequests';

export function usePowermetersByUserAccess(user_id, mode = 'PRODUCTION', options = {}) {
  return useQuery({
    queryKey: ['powermeters', user_id, mode], // include mode in the key
    queryFn: () => fetchPowermetersByUserAccess(user_id, mode),
    enabled: !!user_id && !!mode && (options.enabled === undefined ? true : options.enabled), // Only run if user_id and mode are available
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    ...options,
  });
}