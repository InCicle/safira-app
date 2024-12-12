import React, { HTMLAttributes, useRef } from 'react';
import { CircularProgress, Stack, SxProps, Theme } from '@mui/material';
import { ObserverCallbackOptions, useScrollTargetObserver } from '@/safira-app/hooks/useScrollTargetObserver';

type WaypointProps = React.HTMLAttributes<HTMLElement> & {
  onEnter?(options: ObserverCallbackOptions): void;
  onLeave?(options: ObserverCallbackOptions): void;
  disabled: boolean;
  targetProps?: HTMLAttributes<HTMLLIElement> & {
    sx?: SxProps<Theme>;
  };
};

const Waypoint: React.FC<WaypointProps> = ({ children, disabled, targetProps, onEnter, onLeave, ...rest }) => {
  const rootElementRef = useRef<HTMLUListElement | null>(null);
  const targetElementRef = useRef<HTMLDivElement | null>(null);

  useScrollTargetObserver(() => {
    return {
      rootElement: rootElementRef.current,
      targetElement: targetElementRef.current,
      onLeave,
      onEnter,
    };
  }, [rootElementRef, targetElementRef, disabled]);

  return (
    <ul {...rest} ref={rootElementRef}>
      {children}

      {!disabled && (
        <Stack component="li" {...targetProps} style={{ paddingTop: 8, ...targetProps?.style }}>
          <Stack ref={targetElementRef} position="relative" justifyContent="center" alignItems="center" height="60px">
            <CircularProgress color="secondary" sx={{ width: 24, height: 24 }} />
          </Stack>
        </Stack>
      )}
    </ul>
  );
};

export default Waypoint;
