/*
 * FileName: useApiData.js
 * Author(s): Arturo Vargas
 * Brief: Universal hook to concentrate all API calling HTTP request functions
 * Date: 2025-07-14
 *
 * Copyright (c) 2025 BY: Nexelium Technological Solutions S.A. de C.V.
 * All rights reserved.
 */

import { useQuery, useMutation } from '@tanstack/react-query';

// Import all HTTP request functions
import {
  fetchConsumptionHistory,
  fetchConsumptionProfile,
  fetchDemandHistory,
  fetchDemandProfile,
  fetchLoadCenters,
  fetchMeasurementRange,
  fetchMonthlyReport,
  fetchPowermetersByUserAccess,
  fetchRealTimeData,
  fetchThdCurrentHistory,
  fetchThdCurrentProfile,
  fetchThdVoltageLLHistory,
  fetchThdVoltageLLProfile,
  fetchThdVoltageLNHistory,
  fetchThdVoltageLNProfile,
  pingAPI,
} from '../api/httpRequests';

/**
 * Universal API Data Hook
 * Concentrates all API calling HTTP request functions in one place
 */
export const useApiData = () => {
  
  // ========== EXISTING HOOKS - COPIED CODE ========== //
  
  /**
   * Custom hook to fetch consumption history for a powermeter and user, given a time range.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string} start_utc - ISO string (UTC)
   * @param {string} end_utc - ISO string (UTC)
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @returns {object} React Query result
   */
  const consumptionHistory = (user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['consumptionHistory', user_id, powermeter_id, start_utc, end_utc, mode],
      queryFn: () => fetchConsumptionHistory(user_id, powermeter_id, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch consumption profile for a powermeter and user, given a time range and interval.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string} time_interval - 'hour', 'day', 'month', etc.
   * @param {string} start_utc - ISO string (UTC)
   * @param {string} end_utc - ISO string (UTC)
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const consumptionProfile = (user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['consumptionProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
      queryFn: () => fetchConsumptionProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch demand history for a powermeter and user, given a time range.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string} start_utc - ISO string (UTC)
   * @param {string} end_utc - ISO string (UTC)
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @returns {object} React Query result
   */
  const demandHistory = (user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['demandHistory', user_id, powermeter_id, start_utc, end_utc, mode],
      queryFn: () => fetchDemandHistory(user_id, powermeter_id, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch demand profile for a powermeter and user, given a time range and interval.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string} time_interval - 'hour', 'day', 'month', etc.
   * @param {string} start_utc - ISO string (UTC)
   * @param {string} end_utc - ISO string (UTC)
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const demandProfile = (user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['demandProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
      queryFn: () => fetchDemandProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch powermeters by user access.
   * @param {string} user_id
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const powermetersByUserAccess = (user_id, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['powermeters', user_id, mode], // include mode in the key
      queryFn: () => fetchPowermetersByUserAccess(user_id, mode),
      enabled: !!user_id && !!mode && (options.enabled === undefined ? true : options.enabled), // Only run if user_id and mode are available
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch real-time data for a powermeter and user.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const realTimeData = (user_id, powermeter_id, mode = 'PRODUCTION', options = {}) => {
    console.log(`[API CALL] realTimeData: user_id=${user_id}, powermeter_id=${powermeter_id}`);
    return useQuery({
      queryKey: ['realTimeData', user_id, powermeter_id, mode],
      queryFn: () => fetchRealTimeData(user_id, powermeter_id, mode),
      enabled: true,
      
      ...options,
    });
  };

  /**
   * Custom hook to fetch the available measurement range for a powermeter.
   * @param {string|number} powermeter_id - The powermeter ID.
   * @param {string} mode - The environment mode (DEMO, DEV, PRODUCTION).
   * @param {object} options - Optional React Query options.
   * @returns {object} React Query result with { data, isLoading, error }
   */
  const measurementRange = (powermeter_id, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['measurementRange', powermeter_id, mode],
      queryFn: () => fetchMeasurementRange(powermeter_id, mode),
      enabled: !!powermeter_id && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 10, // 10 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch load centers for a user.
   * @param {string} user_id
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const loadCenters = (user_id, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['loadCenters', user_id, mode],
      queryFn: () => fetchLoadCenters(user_id, mode),
      enabled: !!user_id && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * Custom hook to fetch monthly report for a powermeter and user.
   * @param {string} user_id
   * @param {string|number} powermeter_id
   * @param {string|number} year 
   * @param {string} mode - DEMO, DEV, PRODUCTION
   * @param {object} options - React Query options
   * @returns {object} React Query result
   */
  const monthlyReport = (user_id, powermeter_id, year, mode = 'PRODUCTION', options = {}) => {
    const formattedYear = String(year); // Ensure year is a string

    return useQuery({
      queryKey: ['monthlyReport', user_id, powermeter_id, formattedYear, mode],
      queryFn: () => fetchMonthlyReport(user_id, powermeter_id, formattedYear, mode),
      enabled: !!user_id && !!powermeter_id && !!formattedYear && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  // ========== NEW THD HOOKS - CLONED FROM DEMAND PATTERNS ========== //

  /**
   * THD Current hooks (cloned from demand patterns)
   */
  /**
   * THD Current hooks (cloned from demand patterns)
   */
  const thdCurrentHistory = (user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdCurrentHistory', user_id, powermeter_id, start_utc, end_utc, mode],
      queryFn: () => fetchThdCurrentHistory(user_id, powermeter_id, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  const thdCurrentProfile = (user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdCurrentProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
      queryFn: () => fetchThdCurrentProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * THD Voltage LL hooks (cloned from demand patterns)
   */
  const thdVoltageLLHistory = (user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdVoltageLLHistory', user_id, powermeter_id, start_utc, end_utc, mode],
      queryFn: () => fetchThdVoltageLLHistory(user_id, powermeter_id, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  const thdVoltageLLProfile = (user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdVoltageLLProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
      queryFn: () => fetchThdVoltageLLProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  /**
   * THD Voltage LN hooks (cloned from demand patterns)
   */
  const thdVoltageLNHistory = (user_id, powermeter_id, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdVoltageLNHistory', user_id, powermeter_id, start_utc, end_utc, mode],
      queryFn: () => fetchThdVoltageLNHistory(user_id, powermeter_id, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  const thdVoltageLNProfile = (user_id, powermeter_id, time_interval, start_utc, end_utc, mode = 'PRODUCTION', options = {}) => {
    return useQuery({
      queryKey: ['thdVoltageLNProfile', user_id, powermeter_id, time_interval, start_utc, end_utc, mode],
      queryFn: () => fetchThdVoltageLNProfile(user_id, powermeter_id, time_interval, start_utc, end_utc, mode),
      enabled: !!user_id && !!powermeter_id && !!time_interval && !!start_utc && !!end_utc && (options.enabled === undefined ? true : options.enabled),
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      ...options,
    });
  };

  // ========== API WARMUP HOOK ========== //
  
  /**
   * Hook to ping the API for warming up Azure Functions
   * @param {object} options - React Query options
   * @returns {object} React Query mutation result
   */
  const apiPing = (options = {}) => {
    return useMutation({
      mutationFn: pingAPI,
      retry: false, // Don't retry ping failures
      ...options,
    });
  };

  // ========== RETURN ALL HOOKS ========== //
  
  return {
    // Existing hooks
    consumptionHistory,
    consumptionProfile,
    demandHistory,
    demandProfile,
    powermetersByUserAccess,
    realTimeData,
    measurementRange,
    loadCenters,
    monthlyReport,
    
    // New THD hooks
    thdCurrentHistory,
    thdCurrentProfile,
    thdVoltageLLHistory,
    thdVoltageLLProfile,
    thdVoltageLNHistory,
    thdVoltageLNProfile,
    
    // API warmup
    apiPing,
  };
};