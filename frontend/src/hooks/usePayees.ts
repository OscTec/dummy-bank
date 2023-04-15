import { useEffect, useState } from "react";
import Payee from "../types/Payee";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

// dummy api request
const apiClient = {
  get: <T>() => {
    return new Promise<FetchResponse<Payee>>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          count: 1,
          results: [
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345678,
              sortCode: 123456,
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "John Smith",
              accountNumber: 87654321,
              sortCode: 654321,
            },
          ],
        });
      }, 1000);
    });
  },
};

const usePayees = (deps?: any) => {
  const [data, setData] = useState<Payee[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchResponse<Payee>>()
        .then((res) => {
          setData(res.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err?.name === "AboutError") return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default usePayees;
