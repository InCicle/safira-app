import Cookies from 'js-cookie';
import { domainName } from './domainName';

export function removeAuth() {
  const getAllCookies = Cookies.get();

  for (const cookie in getAllCookies) {
    Cookies.remove(cookie, { domain: domainName });
  }

  if (typeof window === 'undefined') return;

  window.localStorage.clear();
}
