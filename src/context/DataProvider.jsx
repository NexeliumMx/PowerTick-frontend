import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { fetchRealtime as fetchDemoRealtime, fetchHistoricConsumption as fetchDemoHistory, fetchAllPowerMeters } from "../services/api/fetchDemoAPI";
import { fetchRealtime as fetchLiveRealtime, fetchHistoricConsumption as fetchLiveHistory } from "../services/api/fetchLiveAPI";
import { ModeContext } from "./AppModeContext";
import { useFetch } from "../hooks/useFetch";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  // State to cache data
  const [cachedData, setCachedData] = useState({
    realTimeData: null,
    historicalData: null,
    powerMeters: null,
  });

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // Fetch functions based on mode
  const fetchRealtimeFn = useMemo(() => {
    return state.mode === "DEMO_MODE" ? fetchDemoRealtime : fetchLiveRealtime;
  }, [state.mode]);

  const fetchHistoryFn = useMemo(() => {
    return state.mode === "DEMO_MODE" ? fetchDemoHistory : fetchLiveHistory;
  }, [state.mode]);

  useEffect(() => {
    // Check if data is already cached
    if (state.mode === "DEMO_MODE" && !cachedData.powerMeters) {
      setIsFetching(true);
      fetchAllPowerMeters()
        .then((data) => {
          setCachedData((prev) => ({ ...prev, powerMeters: data }));
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching power meters:", err);
          setError("Failed to retrieve power meters.");
        })
        .finally(() => setIsFetching(false));
    }
  }, [state.mode, cachedData.powerMeters]);

  const { isFetching: isFetchingRealtime, fetchedData: realTimeData, error: realtimeError } = useFetch(fetchRealtimeFn, cachedData.realTimeData);
  const { isFetching: isFetchingHistory, fetchedData: historicalData, error: historyError } = useFetch(fetchHistoryFn, cachedData.historicalData);

  useEffect(() => {
    // Cache fetched real-time data
    if (realTimeData) {
      setCachedData((prev) => ({ ...prev, realTimeData }));
    }
  }, [realTimeData]);

  useEffect(() => {
    // Cache fetched historical data
    if (historicalData) {
      setCachedData((prev) => ({ ...prev, historicalData }));
    }
  }, [historicalData]);

  const isFetchingCombined = isFetching || isFetchingRealtime || isFetchingHistory;
  const combinedError = error || realtimeError || historyError;

  console.log("Cached Data:", cachedData);

  return (
    <DataContext.Provider
      value={{
        realTimeData: cachedData.realTimeData,
        historicalData: cachedData.historicalData,
        powerMeters: cachedData.powerMeters,
        isFetching: isFetchingCombined,
        error: combinedError,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);