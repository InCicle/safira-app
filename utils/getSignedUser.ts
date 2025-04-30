import Cookies from 'js-cookie';
import { IUser } from '../interfaces/User';
import { decode } from './crypto';

export function getSignedUser(): IUser | false {
  try {
    const encodedUser = Cookies.get('user');
    const user = encodedUser && decode(encodedUser);

    if (user) {
      return JSON.parse(user);
    }

    return false;
  } catch {
    return false;
  }
}
