import { decode, encode } from '@/utils/crypto';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';
import { redirectToCore, removeAuthCookies } from '@/utils/auth';
import { IUser } from '@/interfaces/User';
import { domainName } from '@/utils/domainName';
import { jwtDecode } from 'jwt-decode';
import { links } from '@/utils/links';
import { IToken } from '@/interfaces/Token';
import axios from 'axios';
import { AuthContext } from './Context';

export interface AuthState {
  token: string;
  expiresIn: string | number;
  user: IUser;
}

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
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
      setData((prevState) => ({
        ...prevState,
        user,
      }));
    },
    [setData],
  );

  const doRefreshToken = useCallback(async () => {
    try {
      const currentRefreshToken = Cookies.get('refreshToken');

      if (!currentRefreshToken) return null;

      const { data: response } = await axios.post(
        `${links.api.core}/refresh-token`,
        {
          refresh_token: decode(currentRefreshToken),
        },
      );

      Cookies.set('authToken', encode(response.token), {
        domain: domainName,
      });

      Cookies.set('refreshToken', encode(response.refreshToken), {
        domain: domainName,
      });

      return response.token;
    } catch {
      signOut();
    }

    return null;
  }, []);

  const refreshToken = useCallback(() => {
    let token = Cookies.get('authToken');
    if (token) {
      token = decode(token);
      axios({
        url: '/refresh',
        baseURL: `${links.api.core}/auth`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const { access_token, expires_in } = response.data;
          const jwt: IToken = jwtDecode(access_token);
          const user = JSON.stringify(jwt.user);

          Cookies.set('authToken', encode(access_token), {
            domain: domainName,
          });
          Cookies.set('expiresIn', encode(expires_in.toString()), {
            domain: domainName,
          });
          Cookies.set('user', encode(user), {
            domain: domainName,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

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
    // const delay = Number(data.expiresIn) * 1000 - 90 * 1000;
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
        refreshToken: doRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
