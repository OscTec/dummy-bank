import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import Transaction from "../types/Transaction";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

// dummy api request
const apiClient = {
  get: <T>() => {
    return new Promise<FetchResponse<Transaction>>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          count: 1,
          results: [
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "YouTube Premium",
              amount: -12.99,
              newBalance: 83.01,
              category: "Entertainment",
              date: "27/03/22",
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Spotify Premium",
              amount: -9.99,
              newBalance: 73.02,
              category: "Entertainment",
              date: "27/03/22",
            },
          ],
        });
      }, 1000);
    });
  },
};

const useTransactions = (deps?: any) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchResponse<Transaction>>()
        .then((res) => {
          setData(res.results);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading };
};

export default useTransactions;
