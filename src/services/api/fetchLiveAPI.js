export async function fetchRealtime() {
  console.log('Calling fetchLiveRealtime API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/AVC-123456789/realtime?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch demo real-time data");
  }

  return resData;
}

export async function fetchHistoricConsumption() {
  console.log('Calling fetchLiveHistory API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/AVC-123456789/history/consumption/hour?schema=demo");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch demo historical consumption data");
  }

  return resData;
}