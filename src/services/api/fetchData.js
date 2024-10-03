// service/api/fetchData.js
import apiBaseUrl from './apiConnection';

export const fetchTimestampData = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/api/getTimestamp`);
    if (!response.ok) {
      throw new Error('Failed to fetch timestamp data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching timestamp data:', error);
    return null;
  }
};