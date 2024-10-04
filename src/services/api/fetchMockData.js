import { timestampData } from '../../data/mockChartsData'; // Import only the timestamp data

export async function fetchFromMockData() {
  // Simulate a delay to mimic real API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(timestampData);
    }, 1000); // 1 second delay
  });
}