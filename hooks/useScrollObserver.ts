import { useEffect, useState } from "react";

export type ObserverCallbackOptions = {
  entry: IntersectionObserverEntry;
  hasScrollY: boolean;
  hasScrollX: boolean;
}

export type ScrollObserverOptions = {
  rootElement?: Element | null;
  targetElement?: Element | null;
  onEnter?(options: ObserverCallbackOptions): void;
  onLeave?(options: ObserverCallbackOptions): void;
}

export function useScrollObserver(options: ScrollObserverOptions) {
  const { rootElement, targetElement, onEnter, onLeave } = options;

  useEffect(() => {
    if (!rootElement || !targetElement) return;

    const observer = new IntersectionObserver(
      entries => {
        const options: ObserverCallbackOptions = {
          entry: entries[0],
          hasScrollX: rootElement.scrollWidth > rootElement.clientWidth,
          hasScrollY: rootElement.scrollHeight > rootElement.clientHeight,
        }

        if (entries[0].isIntersecting) onEnter?.(options);
        else onLeave?.(options);
      },
      {
        root: rootElement,
        threshold: 1,
      },
    );

    observer.observe(targetElement);
    return () => observer.unobserve(targetElement);
  }, [options]); // eslint-disable-line
}
