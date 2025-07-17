import { LanguageType } from '@/interfaces/Language';

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

export type Controller = {
  timeStyle: TimeStyle;
  initialDate: Date;
  timerInterval: null | NodeJS.Timeout;
  count: {
    months: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  onCountChange: ((message: string) => void) | null;
};
