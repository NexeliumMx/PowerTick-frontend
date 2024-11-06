export async function fetchRealtime() {
  console.log('Calling fetchLiveRealtime API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/E3T15060693/realtime?schema=powertic");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch powertic real-time data");
  }

  return resData;
}

export async function fetchHistoricConsumption() {
  console.log('Calling fetchLiveHistory API');
  const response = await fetch("https://powertic-api.azurewebsites.net/api/powermeters/E3T15060693/history/consumption/hour?schema=powertic");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch powertic historical consumption data");
  }

  return resData;
}