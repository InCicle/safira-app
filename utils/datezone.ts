import moment from 'moment';
import { useHeaderProvider } from 'safira-app/contexts/HeaderContext';

export function DateZoneHandler(dateValue: string) {
  const { user } = useHeaderProvider();

  function getDateTime() {
    const dateTime = new Date(dateValue).toLocaleString('en-US', {
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

  const withFormat = (format: string) => moment(getDateTime()).locale(user.config.default_language).format(format);

  return {
    withFormat,
    getDateTime,
    getDateTimeLocal,
  };
}
