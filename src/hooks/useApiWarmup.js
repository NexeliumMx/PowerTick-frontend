/**
 * FileName: src/hooks/useApiWarmup.js
 * Author(s): Arturo Vargas
 * Brief: Hook for warming up the Azure Functions API on application startup
 * Date: 2025-07-20
 *
 * Description:
 * This hook automatically pings the API when the application loads to warm up
 * Azure Functions and reduce cold start latency for subsequent requests.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { useEffect, useRef } from 'react';
import { useApiData } from './useApiData';

/**
 * Hook to warm up the API on application startup
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether to enable auto warmup (default: true)
 * @param {number} options.timeout - Timeout for warmup request in ms (default: 10000)
 * @returns {Object} Warmup status and manual trigger function
 */
export const useApiWarmup = (options = {}) => {
  const { enabled = true, timeout = 10000 } = options;
  const { apiPing } = useApiData();
  const hasWarmedUp = useRef(false);

  const warmupApi = () => {
    if (hasWarmedUp.current) {
      console.log('[API WARMUP] API already warmed up, skipping...');
      return;
    }

    console.log('[API WARMUP] Starting API warmup...');
    hasWarmedUp.current = true;

    // Create timeout for the warmup request
    const timeoutId = setTimeout(() => {
      console.warn('[API WARMUP] Warmup timeout exceeded');
    }, timeout);

    apiPing.mutate(undefined, {
      onSuccess: (data) => {
        clearTimeout(timeoutId);
        if (data) {
          console.log(
            `[API WARMUP] API warmed up successfully. Cold start: ${data.coldStart}, Response time: ${data.responseTime}ms, Environment: ${data.environment}`
          );
        }
      },
      onError: (error) => {
        clearTimeout(timeoutId);
        console.warn('[API WARMUP] Failed to warm up API:', error.message);
        // Reset flag to allow retry
        hasWarmedUp.current = false;
      }
    });
  };

  useEffect(() => {
    if (enabled) {
      // Small delay to let the app initialize properly
      const initTimeout = setTimeout(warmupApi, 100);
      return () => clearTimeout(initTimeout);
    }
  }, [enabled]);

  return {
    isWarming: apiPing.isPending,
    isWarmed: apiPing.isSuccess,
    error: apiPing.error,
    warmupApi, // Manual trigger function
  };
};
