import { useEffect } from 'react';

interface IntersectionObserverProps {
  observerRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

export const useIntersectionObserver = ({
  observerRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 1.0,
}: IntersectionObserverProps) => {
  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current); // eslint-disable-line
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]); // eslint-disable-line
};
