import React, { useLayoutEffect, useRef } from 'react';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { TimeAgoData } from './types';

type TimeAgoProps = TimeAgoData & React.HTMLAttributes<HTMLSpanElement>;

function TimeAgo({ date, timeStyle, ...rest }: Partial<TimeAgoProps>) {
  const timeElementRef = useRef<HTMLSpanElement | null>(null);
  const timeAgo = useTimeAgo({ date, timeStyle });

  useLayoutEffect(() => {
    const timeElement = timeElementRef.current as HTMLSpanElement;

    timeAgo.startCounter();

    timeAgo.onCountChange((message) => {
      timeElement.innerText = message;
    });

    return () => {
      timeAgo.stopCounter();
    };
  }, [timeElementRef, date, timeStyle]);

  return (
    <span ref={timeElementRef} role="timer" {...rest}>
      - - -
    </span>
  );
}

export default TimeAgo as React.FC<Partial<TimeAgoProps>>;
