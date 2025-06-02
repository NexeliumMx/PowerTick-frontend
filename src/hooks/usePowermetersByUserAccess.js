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
import { fetchPowermetersByUserAccess } from '../services/api/httpRequests';

export function usePowermetersByUserAccess(user_id, mode = 'PRODUCTION') {
  return useQuery({
    queryKey: ['powermeters', user_id, mode], // include mode in the key
    queryFn: () => fetchPowermetersByUserAccess(user_id, mode),
    enabled: !!user_id, // Only run if user_id is available
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}