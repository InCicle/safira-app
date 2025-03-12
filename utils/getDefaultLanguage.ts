import { decode } from './crypto';
import { IUser } from '../interfaces/User';
import Cookies from 'js-cookie';

export const getDefaultLanguage = () => {
  const encodedUser = decode(Cookies.get('user') ?? '');
  const { config }: IUser = encodedUser ? JSON.parse(encodedUser) : { config: { default_language: 'en' } };
  return config.default_language;
};
