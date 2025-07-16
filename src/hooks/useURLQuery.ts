import { useMemo, useState } from 'react';

export function useURLQuery() {
  const [forceState, setForceState] = useState(0);

  function updateState() {
    setForceState(old => old + 1);
  }

  function removeParam(key: string) {
    const regex = new RegExp(`${key}=.+?(?=&|$)`);
    if (typeof window !== 'undefined') {
      const url = window.location.href.replace(regex, '').replace(/&&/, '&').replace(/(\?&)/g, '?').replace(/&$/, '');

      window.history.pushState('', '', url);
    }
  }

  const handler = useMemo(() => {
    return {
      get(queryName: string) {
        if (typeof window !== 'undefined') {
          const urlSearchParams = new URLSearchParams(window.location.search);
          return urlSearchParams.get(queryName);
        }
      },
      delete(params: string | string[]) {
        if (typeof params === 'string') {
          removeParam(params);
          return;
        }

        params.forEach(removeParam);
        updateState();
      },
    };
  }, [forceState]); // eslint-disable-line

  return handler;
}
