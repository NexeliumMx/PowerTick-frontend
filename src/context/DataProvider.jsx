import React, { createContext, useContext, useMemo, useState } from "react";
import { fetchRealtime as fetchDemoRealtime, fetchHistoricConsumption as fetchDemoHistory } from "../services/api/fetchDemoAPI";
import { fetchRealtime as fetchLiveRealtime, fetchHistoricConsumption as fetchLiveHistory } from "../services/api/fetchLiveAPI";
import { fetchAllPowerMeters } from "../services/api/fetchDemoAPI"; // For fetching power meters
import { ModeContext } from "./AppModeContext";
import { useFetch } from "../hooks/useFetch";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  const [selectedPowerMeter, setSelectedPowerMeter] = useState(null); // Selected power meter state
  const [powerMeters, setPowerMeters] = useState([]);
  const [powerMeterError, setPowerMeterError] = useState(null);
  const [isPowerMeterLoading, setIsPowerMeterLoading] = useState(false);

  // Fetch power meters when in DEMO_MODE
  useMemo(() => {
    if (state.mode === "DEMO_MODE") {
      setIsPowerMeterLoading(true);
      fetchAllPowerMeters()
        .then((data) => {
          setPowerMeters(data);
          setSelectedPowerMeter((prev) => prev || (data.length > 0 ? data[0].serial_number : null));
          setPowerMeterError(null);
        })
        .catch((err) => {
          console.error("Error fetching power meters:", err);
          setPowerMeterError("Failed to fetch power meters.");
        })
        .finally(() => {
          setIsPowerMeterLoading(false);
        });
    } else {
      setPowerMeters([]);
      setSelectedPowerMeter(null);
    }
  }, [state.mode]);

  const fetchRealtimeFn = useMemo(() => {
    return state.mode === "DEMO_MODE" ? fetchDemoRealtime : fetchLiveRealtime;
  }, [state.mode]);

  const fetchHistoryFn = useMemo(() => {
    return state.mode === "DEMO_MODE" ? fetchDemoHistory : fetchLiveHistory;
  }, [state.mode]);

  const { isFetching: isFetchingRealtime, fetchedData: realTimeData, error: realtimeError } = useFetch(fetchRealtimeFn, null);
  const { isFetching: isFetchingHistory, fetchedData: historicalData, error: historyError } = useFetch(fetchHistoryFn, null);

  const isFetching = isFetchingRealtime || isFetchingHistory || isPowerMeterLoading;
  const error = realtimeError || historyError || powerMeterError;

  return (
    <DataContext.Provider
      value={{
        realTimeData,
        historicalData,
        isFetching,
        error,
        powerMeters,
        selectedPowerMeter,
        setSelectedPowerMeter,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);