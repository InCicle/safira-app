import { language } from '../../../interfaces/Language';
import { Controller, TimeStyle } from '../types';
import { options } from './data';
import { getDefaultLanguage } from '@/safira-app/utils/getDefaultLanguage';

type TimeAgoUseCaseProps = {
  format: language;
  date: string | Date;
  timeStyle: TimeStyle;
};

export function timeAgoUseCase({ date, timeStyle }: Partial<TimeAgoUseCaseProps>) {
  const defaultLanguage = getDefaultLanguage();
  const controller: Controller = {
    format: defaultLanguage as language || 'en',
    timeStyle: 'full',
    initialDate: new Date(),
    timerInterval: null,
    count: {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    onCountChange: null,
  };
  controller.timeStyle = timeStyle || 'mini';
  controller.initialDate = date ? new Date(date) : new Date();

  const Timer = {
    startCounter(ms = 1000) {
      controller.timerInterval = setInterval(Timer.timer, ms);
    },
    stopCounter() {
      clearInterval(controller.timerInterval);
    },
    onCountChange(cb: (message: string) => void) {
      controller.onCountChange = cb;
    },
    timer() {
      const { initialDate } = controller;
      const now = new Date();
      const difference = now.getTime() - initialDate.getTime();
      const daysInMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();

      controller.count = {
        seconds: Math.floor((difference / 1000) % 60),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        days: Math.floor((difference / 1000 / 60 / 60 / 24) % daysInMonth),
        months: Math.floor(difference / 1000 / 60 / 60 / 24 / daysInMonth),
      };

      Timer.handleTimeAgoMessage();
    },
    handleTimeAgoMessage() {
      let message = '';

      const { count } = controller;
      const order = ['months', 'days', 'hours', 'minutes', 'seconds'];
      const keysToStopTimeout = ['months', 'days', 'hours'];
      const arrAcounter = order.map(timeUnit => [timeUnit, count[timeUnit]]);

      for (const [key, value] of arrAcounter) {
        if (value > 0) {
          if (keysToStopTimeout.includes(key)) {
            Timer.stopCounter();
          }

          message = Timer.getMessage(key, value);
          break;
        }
      }

      if (controller.onCountChange) {
        controller.onCountChange(message);
      }
    },
    getMessage(keyName: string, value: number) {
      const { format, timeStyle } = controller;
      const replacer = (msg: string) => msg.replace('[n]', String(value));

      switch (keyName) {
        case 'months':
          if (value > 1) return replacer(options[format].months.more.full!);
          return replacer(options[format].months.one.full!);

        case 'days':
          if (value > 1) return replacer(options[format].days.more[timeStyle]!);
          return replacer(options[format].days.one[timeStyle]!);

        case 'hours':
          if (value > 1) return replacer(options[format].hours.more[timeStyle]!);
          return replacer(options[format].hours.one[timeStyle]!);

        case 'minutes':
          if (value > 1) return replacer(options[format].minutes.more[timeStyle]!);
          return replacer(options[format].minutes.one[timeStyle]!);

        case 'seconds':
          if (value > 1) return replacer(options[format].seconds.more[timeStyle]!);
          return replacer(options[format].seconds.one[timeStyle]!);

        default:
          return '';
      }
    },
  };

  return Timer;
}
