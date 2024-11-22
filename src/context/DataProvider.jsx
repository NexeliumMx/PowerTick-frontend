import React, { createContext, useContext, useMemo } from 'react';
import { fetchRealtime as fetchDemoRealtime, fetchHistoricConsumption as fetchDemoHistory } from '../services/api/fetchDemoAPI';
import { fetchRealtime as fetchLiveRealtime, fetchHistoricConsumption as fetchLiveHistory } from '../services/api/fetchLiveAPI';
import { ModeContext } from './AppModeContext';
import { useFetch } from '../hooks/useFetch';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  // Memoize fetch functions based on mode
  const fetchRealtimeFn = useMemo(() => {
    return state.mode === 'DEMO_MODE' ? fetchDemoRealtime : fetchLiveRealtime;
  }, [state.mode]);

  const fetchHistoryFn = useMemo(() => {
    return state.mode === 'DEMO_MODE' ? fetchDemoHistory : fetchLiveHistory;
  }, [state.mode]);

  const { isFetching: isFetchingRealtime, fetchedData: realTimeData, error: realtimeError } = useFetch(fetchRealtimeFn, null);
  const { isFetching: isFetchingHistory, fetchedData: historicalData, error: historyError } = useFetch(fetchHistoryFn, null);

  const isFetching = isFetchingRealtime || isFetchingHistory;
  const error = realtimeError || historyError;

  return (
    <DataContext.Provider value={{ realTimeData, historicalData, isFetching, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);