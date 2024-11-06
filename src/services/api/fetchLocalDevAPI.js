// src/services/api/fetchLocalDevAPI.js

// Function to fetch real-time data from the local development server
export async function fetchRealtime(serialNumber) {
  const response = await fetch("http://localhost:7071/api/powermeters/AVC-123456789/realtime?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch local development real-time data");
  }

  // Return only the specific real-time data
  return resData.realtime; // Assuming the response has a "realtime" property
}

// Function to fetch historical consumption data from the local development server
export async function fetchHistoricConsumption(serialNumber) {
  const response = await fetch("http://localhost:7071/api/powermeters/AVC-123456789/history/consumption/hour?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch local development historical consumption data");
  }

  // Return only the specific historical consumption data
  return resData.HistoricConsumption; // Assuming the response has a "HistoricConsumption" property
}