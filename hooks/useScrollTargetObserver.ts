import { useEffect, useRef, useState } from 'react';

export type ObserverCallbackOptions = {
  entry: IntersectionObserverEntry;
  hasScrollY: boolean;
  hasScrollX: boolean;
};

export type RootCheckScrollOptions = Omit<ObserverCallbackOptions, 'entry'>;

export type RootScrollOptions = {
  ev: Event;
};

export type ScrollObserverOptions = {
  rootElement?: Element | null;
  targetElement?: Element | null;
  threshold?: number;
  rootMargin?: string;
  checkScroll?: (options: RootCheckScrollOptions) => void;
  onScroll?: (options: RootScrollOptions) => void;
  onEnter?(options: ObserverCallbackOptions): void;
  onLeave?(options: ObserverCallbackOptions): void;
};

export function useScrollTargetObserver(cb: () => ScrollObserverOptions, dependencies: any[] = []) {
  const rootElementResizeRef = useRef<{
    timeout: NodeJS.Timeout | null;
    delayMs: number;
  }>({
    timeout: null,
    delayMs: 500,
  });

  useEffect(() => {
    const { rootElement, targetElement, threshold = 0.5, rootMargin, onEnter, onLeave, onScroll, checkScroll } = cb();

    if (!rootElement) return;

    const handleScroll = (ev: Event) => {
      onScroll?.({ ev });
    };

    rootElement.addEventListener('scroll', handleScroll);

    const resizeObserver = new ResizeObserver(() => {
      if (!checkScroll) return;

      clearTimeout(rootElementResizeRef.current.timeout!);

      rootElementResizeRef.current.timeout = setTimeout(() => {
        const hasScrollY = rootElement.scrollHeight > rootElement.clientHeight;
        const hasScrollX = rootElement.scrollWidth > rootElement.clientWidth;

        checkScroll({ hasScrollY, hasScrollX });
      }, rootElementResizeRef.current.delayMs);
    });

    resizeObserver.observe(rootElement);

    if (!targetElement) {
      return () => {
        resizeObserver.unobserve(rootElement);
        rootElement.removeEventListener('scroll', handleScroll);
      };
    }

    const observer = new IntersectionObserver(
      entries => {
        const options: ObserverCallbackOptions = {
          entry: entries[0],
          hasScrollX: rootElement.scrollWidth > rootElement.clientWidth,
          hasScrollY: rootElement.scrollHeight > rootElement.clientHeight,
        };

        if (entries[0].isIntersecting) onEnter?.(options);
        else onLeave?.(options);
      },
      { root: rootElement, threshold, rootMargin },
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
      resizeObserver.unobserve(rootElement);
      rootElement.removeEventListener('scroll', handleScroll);
    };
  }, [...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps
}
