import { LanguageType } from 'safira-app/interfaces/Language';

export type TimeStyle = 'mini' | 'full';

export type TimeAgoData = {
  date: string | Date;
  format: LanguageType;
  timeStyle: TimeStyle;
};

export type TimeOptions = {
  one: {
    [K in TimeStyle]?: string;
  };
  more: {
    [K in TimeStyle]?: string;
  };
};

export type Options = {
  [K in LanguageType]: {
    months: TimeOptions;
    days: TimeOptions;
    hours: TimeOptions;
    minutes: TimeOptions;
    seconds: TimeOptions;
  };
};

export type Controller = {
  format: LanguageType;
  timeStyle: TimeStyle;
  initialDate: Date;
  timerInterval: null | any;
  count: {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  onCountChange: ((message: string) => void) | null;
};
