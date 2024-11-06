// src/context/DataProvider.jsx

import React, { createContext, useContext, useMemo } from 'react';
import { fetchRealtime as fetchDemoRealtime, fetchHistoricConsumption as fetchDemoHistory } from '../services/api/fetchDemoAPI';
import { fetchRealtime as fetchLiveRealtime, fetchHistoricConsumption as fetchLiveHistory } from '../services/api/fetchLiveAPI';
import { fetchRealtime as fetchLocalRealtime, fetchHistoricConsumption as fetchLocalHistory } from '../services/api/fetchLocalDevAPI';
import { ModeContext } from './AppModeContext';
import { useFetch } from '../hooks/useFetch';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  // Memoize fetch functions based on mode to prevent re-fetching on every render
  const fetchRealtimeFn = useMemo(() => {
    return state.mode === 'DEMO_MODE'
      ? fetchDemoRealtime
      : state.mode === 'LIVE_MODE'
      ? fetchLiveRealtime
      : fetchLocalRealtime;
  }, [state.mode]);

  const fetchHistoryFn = useMemo(() => {
    return state.mode === 'DEMO_MODE'
      ? fetchDemoHistory
      : state.mode === 'LIVE_MODE'
      ? fetchLiveHistory
      : fetchLocalHistory;
  }, [state.mode]);

  // Use the useFetch hook for both real-time and historical data
  const { isFetching: isFetchingRealtime, fetchedData: realTimeData, error: realtimeError } = useFetch(fetchRealtimeFn, null);
  const { isFetching: isFetchingHistory, fetchedData: historicalData, error: historyError } = useFetch(fetchHistoryFn, null);

  // Combine the fetching states and error states for simplicity
  const isFetching = isFetchingRealtime || isFetchingHistory;
  const error = realtimeError || historyError;

  return (
    <DataContext.Provider value={{ realTimeData, historicalData, isFetching, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
