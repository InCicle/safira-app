import { useEffect, useRef, useState } from 'react';

type ObserverRect = Omit<DOMRectReadOnly, 'toJSON'>;

export function useResizeObserver(delay: number = 100) {
  const ref = useRef<any>(null);
  const [rect, setRect] = useState<ObserverRect>();
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current || document.body;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeout.current!);
      timeout.current = setTimeout(() => {
        const boundingRect = element.getBoundingClientRect();
        setRect(boundingRect);
      }, delay);
    });
    observer.observe(element);

    return () => {
      clearTimeout(timeout.current!);
      observer.disconnect();
    };
  }, [ref, delay]);

  return {
    ref,
    width: rect?.width || 0,
    height: rect?.height || 0,
  };
}
