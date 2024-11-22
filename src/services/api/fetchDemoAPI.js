export async function fetchAllPowerMeters() {
  console.log('Calling demo fetchAllPowerMeters API');
  const response = await fetch("https://powertick-api-js.azurewebsites.net/api/demoGetPowerMetersInfo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch all powermeters data");
  }

  return resData;
}

export async function generateMeasurementsCSV(selectedSerialNumber, selectedYear, selectedMonth) {
  console.log('Calling demo generateMeasurementsCSV API');
  const url = `https://powertick-api-py.azurewebsites.net/api/demoGenerateMeasurementsCSV?sn=${selectedSerialNumber}&year=${selectedYear}&month=${selectedMonth}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to generate CSV");
  }

  const blob = await response.blob();
  return blob;
}

export async function fetchRealtimeData(serialNumber) {
  if (!serialNumber) {
    console.error("fetchRealtimeData: Serial number is required");
    throw new Error("Serial number is required");
  }

  const url = `https://powertick-api-js.azurewebsites.net/api/demoRealtimeData?sn=${serialNumber}`;
  console.log("Calling fetchRealtimeData API:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const resData = await response.json();
    console.log("fetchRealtimeData API Response:", resData);
    return resData;
  } catch (error) {
    console.error("Error in fetchRealtimeData:", error.message);
    throw error;
  }
}

export async function fetchConsumptionHistory(serialNumber, timePeriod) {
  if (!serialNumber || !timePeriod) {
    console.error("fetchConsumptionHistory: Missing serial number or time period");
    throw new Error("Serial number and time period are required");
  }

  const url = `https://powertick-api-js.azurewebsites.net/api/demoConsumptionHistory?sn=${serialNumber}&time=${timePeriod}`;
  console.log("Calling fetchConsumptionHistory API:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("fetchConsumptionHistory API Response:", data);
    return data;
  } catch (error) {
    console.error("Error in fetchConsumptionHistory:", error.message);
    throw error;
  }
}