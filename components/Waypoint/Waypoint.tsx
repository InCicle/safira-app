import React, { HTMLAttributes, ReactElement, useRef } from 'react';
import { CircularProgress, Stack, SxProps, Theme } from '@mui/material';
import { ObserverCallbackOptions, useScrollTargetObserver } from 'safira-app/hooks/useScrollTargetObserver';

type WaypointProps = React.HTMLAttributes<HTMLElement> & {
  onEnter?(options: ObserverCallbackOptions): void;
  onLeave?(options: ObserverCallbackOptions): void;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  targetChild?: ReactElement;
  targetProps?: HTMLAttributes<HTMLLIElement> & {
    sx?: SxProps<Theme>;
  };
};

const Waypoint: React.FC<WaypointProps> = ({
  children,
  disabled,
  sx,
  targetProps,
  targetChild,
  onEnter,
  onLeave,
  ...rest
}) => {
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
    <Stack component="ul" {...rest} ref={rootElementRef} sx={sx}>
      {children}

      {!disabled && (
        <Stack component="li" {...targetProps} style={{ paddingTop: 8, ...targetProps?.style }}>
          <Stack ref={targetElementRef} position="relative" justifyContent="center" alignItems="center" height="60px">
            {targetChild || <CircularProgress color="secondary" sx={{ width: 24, height: 24 }} />}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Waypoint;
