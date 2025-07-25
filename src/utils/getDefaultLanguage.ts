import { decode } from './crypto';
import { IUser } from '@/interfaces/User';
import Cookies from 'js-cookie';
import { LanguageType } from '@/interfaces/Language';

export const getDefaultLanguage = () => {
  const supportedLanguages = Object.values(LanguageType);
  const encodedUser = decode(Cookies.get('user') ?? '');
  const { config }: IUser = encodedUser
    ? JSON.parse(encodedUser)
    : { config: { default_language: 'en' } };
  const defaultLanguage = supportedLanguages.includes(
    config.default_language as LanguageType,
  )
    ? config.default_language
    : 'en';
  return defaultLanguage;
};
