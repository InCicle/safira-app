import { useEffect, useRef, useState } from 'react';

type RequestArgs<R> = {
  fn: () => Promise<R> | null;
  delayMs?: number;
  deps?: any[];
};

export function useRequest<R extends any>({ fn: request, delayMs, deps = [] }: RequestArgs<R>) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<R | null>(null);
  const [error, setError] = useState<any | null>(null);

  const timeoutRef = useRef<null | number>(null);

  const forceLoad = () => setLoading(true);

  const breakLoad = () => setLoading(false);

  function fetchData() {
    setLoading(true);

    const promise = request();
    if (promise) {
      promise
        .then(setResponse)
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    setLoading(true);

    if (delayMs) {
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = setTimeout(() => fetchData(), delayMs);
      return;
    }

    fetchData();
  }, [...deps, delayMs]); // eslint-disable-line react-hooks/exhaustive-deps

  return { loading, response, setResponse, error, refetch: fetchData, forceLoad, breakLoad };
}
