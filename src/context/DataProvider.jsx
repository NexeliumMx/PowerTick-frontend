import React, { createContext, useContext, useMemo, useState } from "react";
import { fetchRealtimeData, fetchAllPowerMeters } from "../services/api/fetchDemoAPI";
import { ModeContext } from "./AppModeContext";
import { useFetch } from "../hooks/useFetch";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  const [selectedPowerMeter, setSelectedPowerMeter] = useState(null);
  const [powerMeters, setPowerMeters] = useState([]);
  const [powerMeterError, setPowerMeterError] = useState(null);
  const [isPowerMeterLoading, setIsPowerMeterLoading] = useState(false);

  useMemo(() => {
    if (state.mode === "DEMO_MODE") {
      setIsPowerMeterLoading(true);
      fetchAllPowerMeters()
        .then((data) => {
          setPowerMeters(data);
          setSelectedPowerMeter((prev) =>
            prev || (data.length > 0 ? data[0].serial_number : null)
          );
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

  const fetchRealtimeFn = useMemo(() => fetchRealtimeData, []);

  const { isFetching: isFetchingRealtime, fetchedData: realTimeData, error: realtimeError } = useFetch(
    fetchRealtimeFn,
    selectedPowerMeter
  );

  const isFetching = isFetchingRealtime || isPowerMeterLoading;
  const error = realtimeError || powerMeterError;

  console.log("Selected Power Meter:", selectedPowerMeter);
  console.log("Real-Time Data Fetch Result:", realTimeData);

  return (
    <DataContext.Provider
      value={{
        realTimeData,
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