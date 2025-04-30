import React, { createContext, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { links } from '@/safira-app/config/links';
import { IUser } from '@/safira-app/interfaces/User';
import { encode, decode } from '@/safira-app/utils/crypto';
import { domainName } from '../utils/domainName';
import { IToken } from '@/safira-app/interfaces/Token';

export interface VerifyTokenData {
  email: string;
  token: string;
}

export interface AuthState {
  token: string;
  expiresIn: string | number;
  user: IUser;
}

export interface AuthContextData {
  user: IUser;
  signOut(): void;
  updateUser(user: IUser): void;
  refreshToken(): Promise<string | null>;
}

function removeAuthCookies() {
  Cookies.remove('authToken', { domain: domainName });

  Cookies.remove('expiresIn', { domain: domainName });

  Cookies.remove('user', { domain: domainName });

  Cookies.remove('companySelected', { domain: domainName });

  Cookies.remove('selected_schedules', { domain: domainName });
}

function redirectToCore() {
  const rule = /[h][t]{2}[p]s?[:][\/]{2}/; // eslint-disable-line
  const urlToRedirect = `${window.location.href.replace(rule, '')}`;

  window.location.href = `${links.web.core}/?redirect_to=${urlToRedirect}`;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const encodedToken = Cookies.get('authToken');
    const encodedExpiresIn = Cookies.get('expiresIn');
    const encodedUser = Cookies.get('user');

    try {
      const token = encodedToken && decode(encodedToken);
      const expiresIn = encodedExpiresIn && decode(encodedExpiresIn);
      const user = encodedUser && decode(encodedUser);
      if (token && expiresIn && user) {
        return { token, expiresIn, user: JSON.parse(user) as IUser };
      }
    } catch {
      signOut();

      return {} as AuthState;
    }
    signOut();

    return {} as AuthState;
  });

  function signOut() {
    removeAuthCookies();
    window.localStorage.removeItem('avatar');
    redirectToCore();
  }

  const updateUser = useCallback(
    (user: IUser) => {
      Cookies.set('user', encode(JSON.stringify(user)));
      setData(prevState => ({
        ...prevState,
        user,
      }));
    },
    [setData],
  );

  const updateAuth = useCallback(
    (token: string, expiresIn: string | number) => {
      Cookies.set('authToken', encode(token), {
        domain: domainName,
      });
      Cookies.set('expiresIn', encode(expiresIn.toString()), {
        domain: domainName,
      });

      setData(prevState => ({
        ...prevState,
        token,
        expiresIn,
      }));
    },
    [setData],
  );

  const refreshToken = useCallback(async (): Promise<string | null> => {
    let token = Cookies.get('authToken');
    if (!token) return null;
    token = decode(token);
    try {
      const response = await axios({
        url: '/refresh',
        baseURL: `${links.api.schedule}/auth`,
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: 'GET',
      });

      removeAuthCookies();

      const { access_token, expires_in } = response.data;
      const jwt = jwtDecode<IToken>(access_token);
      const user = JSON.stringify(jwt.user);

      updateAuth(access_token, expires_in);
      updateUser(JSON.parse(user) as IUser);

      return access_token;
    } catch {
      signOut();
      return null;
    }
  }, [updateAuth, updateUser]);

  const tokenTimeout = () => {
    const expiresIn = Cookies.get('expiresIn');

    if (expiresIn) {
      const decodedTime = Number(decode(expiresIn));

      if (decodedTime <= 3000) {
        refreshToken();
      } else {
        const newTime = decodedTime - 1;
        Cookies.set('expiresIn', encode(newTime.toString()), {
          domain: domainName,
        });
      }
    }
  };

  useEffect(() => {
    const delay = 30 * 1000;
    const interval = setInterval(tokenTimeout, delay);

    return () => {
      clearInterval(interval);
    };
  }, []); // eslint-disable-line

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signOut,
        updateUser,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
