/**
 * FileName: src/hooks/useFetchTemplate.js
 * Author(s): Maximilian Schwarzmüller
 * Brief: 
 * Date: 2025-06-01
 * Source: https://github.com/academind/react-complete-guide-course-resources/blob/main/code/16%20Custom%20Hooks/03-finished/src/hooks/useFetch.js
 * 
 **/

import { useEffect, useState } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error
  }
}