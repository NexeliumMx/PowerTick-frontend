import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { fetchConsumptionHistory, fetchAllPowerMeters, fetchRealtimeData } from "../services/api/fetchDemoAPI";
import { ModeContext } from "./AppModeContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { state } = useContext(ModeContext);

  const [powerMeters, setPowerMeters] = useState([]); // List of power meters
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("DEMO0000001"); // Default powermeter
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("year"); // Default time period
  const [realTimeData, setRealTimeData] = useState(null); // Realtime data for powermeter
  const [consumptionData, setConsumptionData] = useState(null); // Consumption history
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch all power meters on mount
  useEffect(() => {
    const fetchPowerMeters = async () => {
      setIsFetching(true);
      try {
        const data = await fetchAllPowerMeters();
        setPowerMeters(data);
        setSelectedPowerMeter((prev) => prev || (data.length > 0 ? data[0].serial_number : null));
      } catch (err) {
        setError(err.message || "Failed to fetch power meters.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchPowerMeters();
  }, []);

  // Fetch real-time data whenever selectedPowerMeter changes
  useEffect(() => {
    const fetchRealTimeData = async () => {
      if (!selectedPowerMeter) return;
      setIsFetching(true);
      try {
        const data = await fetchRealtimeData(selectedPowerMeter);
        setRealTimeData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch real-time data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchRealTimeData();
  }, [selectedPowerMeter]);

  // Fetch consumption data when selectedPowerMeter or selectedTimePeriod changes
  useEffect(() => {
    const fetchConsumptionData = async () => {
      if (!selectedPowerMeter || !selectedTimePeriod) return;
      setIsFetching(true);
      try {
        const data = await fetchConsumptionHistory(selectedPowerMeter, selectedTimePeriod);
        setConsumptionData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch consumption data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchConsumptionData();
  }, [selectedPowerMeter, selectedTimePeriod]);

  console.log("Power Meters:", powerMeters);
  console.log("Selected Power Meter:", selectedPowerMeter);
  console.log("Real-Time Data:", realTimeData);
  console.log("Consumption Data:", consumptionData);

  return (
    <DataContext.Provider
      value={{
        powerMeters,
        selectedPowerMeter,
        setSelectedPowerMeter,
        selectedTimePeriod,
        setSelectedTimePeriod,
        realTimeData,
        consumptionData,
        isFetching,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);