import { LanguageType } from '@/interfaces/Language';
import { Controller, TimeStyle } from '../components/TimeAgo/types';
import { useTranslation } from 'react-i18next';

type TimeAgoUseCaseProps = {
  format: LanguageType;
  date: string | Date;
  timeStyle: TimeStyle;
};

// Criar um hook
export function useTimeAgo({ date, timeStyle }: Partial<TimeAgoUseCaseProps>) {
  const { t } = useTranslation();

  const controller: Controller = {
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
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        0,
      ).getDate();

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
      const arrAcounter = order.map((timeUnit) => [timeUnit, count[timeUnit]]);

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
    getMessage(keyName: string, count: number) {
      const { timeStyle } = controller;

      const isMoreThanOne = count > 1;

      const firstKey = isMoreThanOne ? keyName : keyName.slice(0, -1);
      const secondKey = keyName !== 'months' ? `${timeStyle}_` : '';
      const fullKey = `safira-app.time_ago.${secondKey}${firstKey}`;

      return isMoreThanOne
        ? t(fullKey, {
            count,
          })
        : t(fullKey);
    },
  };

  return Timer;
}
