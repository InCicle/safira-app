import React, { useLayoutEffect, useMemo } from "react";
import { timeAgoUseCase } from "./useCases/timeAgoUseCase";
import { TimeAgoData } from "./types";
import { generateId } from "../generateId";

type TimeAgoProps = TimeAgoData & React.HTMLAttributes<HTMLSpanElement>;

function TimeAgo({ date, format, timeStyle, ...rest }: Partial<TimeAgoProps>) {
  const elId = useMemo(() => generateId({ amount: 20, lowercase: true, uppercase: true }), []);

  useLayoutEffect(() => {
    const timeElement = document.querySelector(`#${elId}`) as HTMLSpanElement;
    const timeAgo = timeAgoUseCase({ date, format, timeStyle });

    timeAgo.startCounter();

    timeAgo.onCountChange(message => {
      timeElement.innerText = message;
    });

    return () => {
      timeAgo.stopCounter();
    };
  }, [elId, date, format, timeStyle]);

  return (
    <span id={elId} role="timer" {...rest}>
      - - -
    </span>
  );
}

export default TimeAgo as React.FC<Partial<TimeAgoProps>>;
