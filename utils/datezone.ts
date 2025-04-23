import { DateTime } from 'luxon';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';

export function DateZoneHandler(dateValue: string) {
  const { user } = useHeaderProvider();

  function getDateTime() {
    const dateTime = new Date(dateValue).toLocaleString(user.config.default_language, {
      timeZone: user.config.default_timezone,
    });

    return dateTime;
  }

  function getDateTimeLocal() {
    const dateTimeLocal = new Date(dateValue).toLocaleString(user.config.default_language, {
      timeZone: user.config.default_timezone,
    });

    return dateTimeLocal;
  }

  const withFormat = (format: string) =>
    DateTime.fromJSDate(new Date(getDateTime())).setLocale(user.config.default_language).toFormat(format);

  return {
    withFormat,
    getDateTime,
    getDateTimeLocal,
  };
}
