// src/context/DataProvider.jsx

import React, { createContext, useContext } from 'react';
import { fetchRealtime as fetchDemoRealtime, fetchHistoricConsumption as fetchDemoHistory } from '../services/api/fetchDemoAPI';
import { fetchRealtime as fetchLiveRealtime, fetchHistoricConsumption as fetchLiveHistory } from '../services/api/fetchLiveAPI';
import { fetchRealtime as fetchLocalRealtime, fetchHistoricConsumption as fetchLocalHistory } from '../services/api/fetchLocalDevAPI';
import { ModeContext } from './AppModeContext';
import { useFetch } from '../hooks/useFetch';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  // Determine the appropriate fetch functions based on the mode
  const fetchRealtimeFn = 
    state.mode === 'DEMO_MODE' ? fetchDemoRealtime : 
    state.mode === 'LIVE_MODE' ? fetchLiveRealtime : 
    fetchLocalRealtime;

  const fetchHistoryFn = 
    state.mode === 'DEMO_MODE' ? fetchDemoHistory : 
    state.mode === 'LIVE_MODE' ? fetchLiveHistory : 
    fetchLocalHistory;

  // Fetch real-time data and historical data using useFetch hook
  const { isFetching: isFetchingRealtime, fetchedData: rawRealTimeData, error: realtimeError } = useFetch(fetchRealtimeFn, null);
  const { isFetching: isFetchingHistory, fetchedData: rawHistoricalData, error: historyError } = useFetch(fetchHistoryFn, null);

  // Extract the specific data if it exists; otherwise, use the full raw data
  const realTimeData = rawRealTimeData ? rawRealTimeData.realtime || rawRealTimeData : null;
  const historicalData = rawHistoricalData ? rawHistoricalData.HistoricConsumption || rawHistoricalData : null;

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
