import { IUser } from '@/interfaces/User';
import Cookies from 'js-cookie';
import { decode } from './crypto';

export function getUser() {
  const encodedUser = Cookies.get('user');
  return encodedUser ? (JSON.parse(decode(encodedUser)) as IUser) : null;
}
