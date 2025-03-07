export type Format = 'pt-BR' | 'en-US' | 'en' | 'pt';

export type TimeStyle = 'mini' | 'full';

export type TimeAgoData = {
  date: string | Date;
  format: Format;
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
  [K in Format]: {
    months: TimeOptions;
    days: TimeOptions;
    hours: TimeOptions;
    minutes: TimeOptions;
    seconds: TimeOptions;
  };
};

export type Controller = {
  format: Format;
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
