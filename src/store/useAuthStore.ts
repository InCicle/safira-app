import { create } from 'zustand';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/interfaces/User';
import { encode, decode } from '@/utils/crypto';
import { domainName } from '@/utils/domainName';
import { IToken } from '@/interfaces/Token';
import { removeAuth } from '@/utils/removeAuth';
import { routesPaths } from '@/routes/types';
import { getRefreshToken } from '@/services/api/token/requests';
import { getUser } from '@/utils/getUser';

export interface AuthStore {
  token: string | null;
  expiresIn: string | number | null;
  user: IUser | null;
  signOut: () => void;
  updateUser: (user: IUser) => void;
  updateAuth: (token: string, expiresIn: string | number) => void;
  refreshToken: () => Promise<string | null>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: (() => {
    const encodedToken = Cookies.get('authToken');
    return encodedToken ? decode(encodedToken) : null;
  })(),
  expiresIn: (() => {
    const encodedExpiresIn = Cookies.get('expiresIn');
    return encodedExpiresIn ? decode(encodedExpiresIn) : null;
  })(),
  user: getUser(),
  signOut: () => {
    removeAuth();
    window.localStorage.removeItem('avatar');
    window.localStorage.removeItem('logo');
    const urlToRedirect = window.location.pathname;
    window.location.href = `${routesPaths.LOGIN}/?redirect_to=${urlToRedirect}`;
    set({ token: null, expiresIn: null, user: null });
  },
  updateUser: (user: IUser) => {
    Cookies.set('user', encode(JSON.stringify(user)));
    set(state => ({ ...state, user }));
  },
  updateAuth: (token: string, expiresIn: string | number) => {
    Cookies.set('authToken', encode(token), { domain: domainName });
    Cookies.set('expiresIn', encode(expiresIn.toString()), { domain: domainName });
    set(state => ({ ...state, token, expiresIn }));
  },
  refreshToken: async () => {
    const token = Cookies.get('authToken');
    if (!token) return null;

    try {
      const response = await getRefreshToken();

      removeAuth();

      const { access_token, expires_in } = response;
      const jwt = jwtDecode<IToken>(access_token);
      const user = JSON.stringify(jwt.user);

      get().updateAuth(access_token, expires_in);
      get().updateUser(JSON.parse(user) as IUser);

      return access_token;
    } catch {
      get().signOut();
      return null;
    }
  },
}));

const tokenTimeout = () => {
  const expiresIn = Cookies.get('expiresIn');
  if (expiresIn) {
    const decodedTime = Number(decode(expiresIn));
    if (decodedTime <= 3000) {
      useAuthStore.getState().refreshToken();
    } else {
      const newTime = decodedTime - 1;
      Cookies.set('expiresIn', encode(newTime.toString()), { domain: domainName });
    }
  }
};

if (typeof window !== 'undefined') {
  const delay = 30 * 1000;
  setInterval(tokenTimeout, delay);
}
