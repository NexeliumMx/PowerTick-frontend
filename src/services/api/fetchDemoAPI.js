export async function fetchAllPowerMeters() {
  console.log('Calling demo fetchAllPowerMeters API');
  const response = await fetch("https://powertick-api-js.azurewebsites.net/api/demoGetPowerMetersInfo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch all powermeters data");
  }

  return resData;
}

export async function fetchRealtime() {
  console.log('Calling fetchDemoRealtime API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/AVC-123456789/realtime?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch demo real-time data");
  }

  return resData.realtime || resData;
}

export async function fetchHistoricConsumption() {
  console.log('Calling fetchDemoHistory API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/AVC-123456789/history/consumption/hour?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch demo historical consumption data");
  }

  return resData.HistoricConsumption || resData;
}


export async function generateMeasurementsCSV(selectedSerialNumber, selectedYear, selectedMonth) {
  console.log('Calling demo generateMeasurementsCSV API');
  const url = `https://powertick-api-py.azurewebsites.net/api/demoGenerateMeasurementsCSV?sn=${selectedSerialNumber}&year=${selectedYear}&month=${selectedMonth}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to generate CSV");
  }

  const blob = await response.blob();
  return blob; // Return the blob for downloading
}