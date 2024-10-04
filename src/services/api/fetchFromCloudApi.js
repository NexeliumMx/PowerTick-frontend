export async function fetchFromCloudApi() {
  const response = await fetch('https://powertic-api.azurewebsites.net/api/gettimestamp');

  if (!response.ok) {
    throw new Error('Failed to fetch timestamp from cloud API');
  }

  const data = await response.json();
  // Assuming the API returns the timestamp in the format {"timestamp":"2024-10-03T21:38:20.051Z"}
  return data.timestamp; // Return the timestamp directly
}