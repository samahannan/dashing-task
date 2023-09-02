import { useState, useEffect } from "react";

export const useFetch = (url: string, options: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const json = await response.json();
        setIsLoading(false);
        setData(json);
        setError(null);
      } catch (error) {
        setError(`${error}`);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { data, isLoading, error };
};
