import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null); // Initialize error to null
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      setError(null); // Clear error when fetch function changes
      setFetchedData(null); // Clear fetched data when fetch function changes

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]); // Fetch data again when fetchFn changes

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}