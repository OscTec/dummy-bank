import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import Account from "../types/Account";
import AccountType from "../types/AccountType";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

// dummy api request
const apiClient = {
  get: <T>() => {
    return new Promise<FetchResponse<Account>>((resolve, reject) => {
      setTimeout(() => {
        resolve({
          count: 1,
          results: [
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345678,
              sortCode: 123456,
              balance: 300,
              currency: "GBP",
              type: AccountType.Current,
              createdAt: "2020-01-01T00:00:00.000Z",
              updatedAt: "2020-01-01T00:00:00.000Z",
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345677,
              balance: 200,
              currency: "GBP",
              type: AccountType.Credit,
              createdAt: "2020-01-01T00:00:00.000Z",
              updatedAt: "2020-01-01T00:00:00.000Z",
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345676,
              sortCode: 123456,
              balance: 5000,
              currency: "GBP",
              type: AccountType.Savings,
              createdAt: "2020-01-01T00:00:00.000Z",
              updatedAt: "2020-01-01T00:00:00.000Z",
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345675,
              sortCode: 123456,
              balance: 1000,
              currency: "GBP",
              type: AccountType.Cash,
              createdAt: "2020-01-01T00:00:00.000Z",
              updatedAt: "2020-01-01T00:00:00.000Z",
            },
            {
              id: Math.random().toString(36).substr(2, 9),
              name: "Oscar Reid",
              accountNumber: 12345674,
              balance: 1000,
              currency: "GBP",
              type: AccountType.Stocks,
              createdAt: "2020-01-01T00:00:00.000Z",
              updatedAt: "2020-01-01T00:00:00.000Z",
            },
          ],
        });
      }, 1000);
    });
  },
};

const useAccounts = (deps?: any) => {
  const [data, setData] = useState<Account[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      apiClient
        .get<FetchResponse<Account>>()
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

export default useAccounts;
