export async function fetchFromDevApi() {
  const response = await fetch('http://localhost:7071/api/getTimestamp');

  if (!response.ok) {
    throw new Error('Failed to fetch timestamp from localhost API');
  }

  const data = await response.json();
  // Assuming the API returns the timestamp in the format {"timestamp":"2024-10-03T21:38:20.051Z"}
  return data.timestamp; // Return the timestamp directly
}