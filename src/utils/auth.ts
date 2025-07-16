import Cookies from 'js-cookie';
import { decode } from '@/utils/crypto';
import { IUser } from '@/interfaces/User';
import axios from 'axios';
import { links } from '@/utils/links';

export interface VerifyTokenData {
  email: string;
  token: string;
}

export const domainName = (() => {
  const { hostname } = window.location;
  const isDevelopmentDomain = hostname.includes('stage');
  const jumpNumber = isDevelopmentDomain ? -3 : -2;
  const domain = hostname.split('.').slice(jumpNumber).join('.');

  return domain;
})();

export function removeAuthCookies() {
  Cookies.remove('authToken', { domain: domainName });

  Cookies.remove('expiresIn', { domain: domainName });

  Cookies.remove('user', { domain: domainName });

  Cookies.remove('companySelected', { domain: domainName });
}

export function redirectToCore() {
  const rule = /[h][t]{2}[p]s?[:][\/]{2}/; // eslint-disable-line
  const urlToRedirect = `${window.location.href.replace(rule, '')}`;

  window.location.href = `${links.web.core}/?redirect_to=${urlToRedirect}`;
}

export async function validateToken(
  verifyTokenData: VerifyTokenData,
): Promise<boolean> {
  try {
    const response = await axios.post(`${links.api.core}/account/verify`, {
      email: verifyTokenData.email,
      token: verifyTokenData.token,
    });

    if (response.status === 200 && !response.data.errors) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}

export function getSignedUser(): IUser | false {
  try {
    const encodedUser = Cookies.get('user');
    const user = encodedUser && decode(encodedUser);

    if (user) {
      return JSON.parse(user);
    }

    return false;
  } catch (error) {
    return false;
  }
}
