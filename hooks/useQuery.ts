import { useMemo, useState } from "react";

export function useQuery() {
  const [forceState, setForceState] = useState(false);

  function updateState() {
    setForceState(!forceState);
  }

  function append(params: Record<string, string>) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.append(key, value);
    });
    const url = `${window.location.origin}/?${urlSearchParams.toString()}`;
    window.history.pushState("", "", url);
    updateState();
  }

  function overwrite(params: Record<string, string>) {
    const parameters = Object.entries(params);

    let url = `${window.location.origin}/?`;
    parameters.forEach(([key, value], index, arr) => {
      const lastItem = Boolean(index + 1 === arr.length);
      url += `${key}=${value}${!lastItem ? "&" : ""}`;
    });

    window.history.pushState("", "", url);
    updateState();
  }

  function removeParam(key: string) {
    const regex = new RegExp(`${key}=.+?(?=&|$)`);
    const url = window.location.href.replace(regex, "").replace(/&&/, "&").replace(/(\?&)/g, "?").replace(/&$/, "");

    window.history.pushState("", "", url);
  }

  const handler = useMemo(() => {
    return {
      get(queryName: string) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(queryName);
      },
      overwrite,
      append,
      delete(params: string | string[]) {
        if (typeof params === "string") {
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
