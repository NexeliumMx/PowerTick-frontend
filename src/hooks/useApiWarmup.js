/**
 * FileName: src/hooks/useApiWarmup.js
 * Author(s): Arturo Vargas
 * Brief: Enhanced hook for warming up the Azure Functions API with health monitoring
 * Date: 2025-07-21
 *
 * Description:
 * This hook automatically pings the API when the application loads to warm up
 * Azure Functions and reduce cold start latency for subsequent requests.
 * Enhanced with health monitoring and better error handling.
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { useEffect, useRef, useState } from 'react';
import { useApiData } from './useApiData';

/**
 * Enhanced hook to warm up the API on application startup
 * Optimized for Azure Functions Consumption plan with health monitoring
 * @param {Object} options - Configuration options
 * @param {boolean} options.enabled - Whether to enable auto warmup (default: true)
 * @param {number} options.timeout - Timeout for warmup request in ms (default: 10000)
 * @param {boolean} options.keepAlive - Whether to periodically ping to prevent cold starts (default: false)
 * @param {number} options.keepAliveInterval - Interval for keep-alive pings in ms (default: 300000 - 5 minutes)
 * @param {boolean} options.enableHealthCheck - Whether to include detailed health checks (default: false)
 * @returns {Object} Warmup status and manual trigger function with health information
 */
export const useApiWarmup = (options = {}) => {
  const { 
    enabled = true, 
    timeout = 10000, 
    keepAlive = false, 
    keepAliveInterval = 300000, // 5 minutes
    enableHealthCheck = false
  } = options;
  
  const { apiPing } = useApiData();
  const hasWarmedUp = useRef(false);
  const keepAliveRef = useRef(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [lastWarmupTime, setLastWarmupTime] = useState(null);

  const warmupApi = (includeHealthCheck = enableHealthCheck) => {
    if (hasWarmedUp.current && !keepAlive) {
      console.log('[API WARMUP] API already warmed up, skipping...');
      return;
    }

    const warmupType = keepAlive ? 'keep-alive' : 'initial';
    console.log(`[API WARMUP] Starting ${warmupType} API warmup...`);
    if (!keepAlive) hasWarmedUp.current = true;

    // Create timeout for the warmup request
    const timeoutId = setTimeout(() => {
      console.warn(`[API WARMUP] ${warmupType} warmup timeout exceeded`);
    }, timeout);

    // Build ping URL with appropriate parameters
    const pingParams = new URLSearchParams({
      warmup: 'true'
    });
    
    if (includeHealthCheck) {
      pingParams.append('detailed', 'true');
    }

    apiPing.mutate(undefined, {
      onSuccess: (data) => {
        clearTimeout(timeoutId);
        setLastWarmupTime(new Date());
        
        if (data) {
          const logMessage = `[API WARMUP] ${warmupType} warmup successful`;
          const logDetails = {
            coldStart: data.system?.coldStart,
            responseTime: data.responseTime,
            environment: data.system?.environment,
            plan: data.system?.plan,
            memory: data.system?.memory,
            nodeVersion: data.system?.nodeVersion
          };
          
          console.log(`${logMessage}:`, logDetails);
          
          // Update health status if available
          if (data.health) {
            setHealthStatus({
              ...data.health,
              lastCheck: new Date().toISOString(),
              status: 'healthy'
            });
          }
          
          // Log performance warnings
          if (data.responseTime > 5000) {
            console.warn('[API WARMUP] Slow response time detected:', data.responseTime, 'ms');
          }
          
          if (data.system?.memory?.heapUsed > 100) {
            console.warn('[API WARMUP] High memory usage detected:', data.system.memory.heapUsed, 'MB');
          }
        }
      },
      onError: (error) => {
        clearTimeout(timeoutId);
        console.warn(`[API WARMUP] Failed to ${warmupType} warm up API:`, error.message);
        
        // Update health status on error
        setHealthStatus({
          status: 'error',
          error: error.message,
          lastCheck: new Date().toISOString()
        });
        
        // Reset flag to allow retry (only for initial warmup)
        if (!keepAlive) hasWarmedUp.current = false;
      }
    });
  };

  useEffect(() => {
    if (enabled) {
      // Initial warmup with small delay
      const initTimeout = setTimeout(() => warmupApi(enableHealthCheck), 100);
      
      // Set up keep-alive if enabled
      if (keepAlive) {
        keepAliveRef.current = setInterval(() => warmupApi(false), keepAliveInterval);
      }
      
      return () => {
        clearTimeout(initTimeout);
        if (keepAliveRef.current) {
          clearInterval(keepAliveRef.current);
        }
      };
    }
  }, [enabled, keepAlive, keepAliveInterval, enableHealthCheck]);

  return {
    isWarming: apiPing.isPending,
    isWarmed: apiPing.isSuccess,
    error: apiPing.error,
    healthStatus,
    lastWarmupTime,
    warmupApi: () => warmupApi(enableHealthCheck), // Manual trigger function
    stats: {
      hasWarmedUp: hasWarmedUp.current,
      keepAliveEnabled: keepAlive,
      healthCheckEnabled: enableHealthCheck
    }
  };
};
