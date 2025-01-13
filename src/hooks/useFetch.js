import { useEffect, useState } from "react";

export const useFetch = (fetchFn, parameter) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!parameter) {
        console.warn("useFetch: No parameter provided");
        setError(new Error("Parameter is required"));
        return;
      }

      setIsFetching(true);
      setError(null);

      try {
        const data = await fetchFn(parameter);
        setFetchedData(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, [fetchFn, parameter]);

  return { isFetching, fetchedData, error };
};