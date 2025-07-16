import { DateTime } from 'luxon';
import { useAuth } from '@/hooks/useAuth';

export function DateZoneHandler(dateValue: string) {
  const { user } = useAuth();

  function getDateTime() {
    const now = new Date(dateValue);

    if (user) return now.toLocaleString(user.config.default_language);
    return now.toLocaleString();
  }

  function getDateTimeLocal() {
    const now = new Date(dateValue);

    if (user)
      return now.toLocaleString(user.config.default_language, {
        timeZone: user.config.default_timezone,
      });
    return now.toLocaleString();
  }

  const withFormat = (format: string) =>
    DateTime.fromJSDate(new Date(getDateTime())).toFormat(format);

  return {
    withFormat,
    getDateTime,
    getDateTimeLocal,
  };
}
