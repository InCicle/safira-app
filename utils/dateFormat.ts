import { DateTime } from 'luxon';
import { getDefaultLanguage } from './getDefaultLanguage';

export const dateFormat = (date: string | Date, format: string) => {
  /**
   * This function is used to format dates on notifications text
   *
   * params:
   *  date: a valid string date format or a javascript date object
   *  format: string representing the format for date string return (must be a Luxon valid format)
   *
   * return: formatted date as string
   */
  const default_language = getDefaultLanguage();
  return DateTime.fromJSDate(new Date(date)).setLocale(default_language).toFormat(format);
};
