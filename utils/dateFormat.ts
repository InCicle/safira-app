import moment from 'moment';

export const dateFormat = (date: string | Date, format: string) => {
  /**
   * This function is used to format dates on notifications text
   *
   * params:
   *  date: a valid string date format or a javascript date object
   *  format: string representing the format for date string return (must be an moment valid format)
   *
   * return: formated date as string
   */
  return moment(date).locale('pt-br').format(format);
};
