import React, { createContext, useCallback, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { encode, decode } from "@safira/utils/crypto";
import { IUser } from "@safira/interfaces/User";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { links } from "@safira/config/links";

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

export const domainName = (() => {
  const { hostname } = window.location;
  const isDevelopmentDomain = hostname.includes("stage");
  const jumpNumber = isDevelopmentDomain ? -3 : -2;
  const domain = hostname.split(".").slice(jumpNumber).join(".");

  return domain;
})();

const removeAuthCookies = () => {
  Cookies.remove("authToken", { domain: domainName });

  Cookies.remove("expiresIn", { domain: domainName });

  Cookies.remove("user", { domain: domainName });

  Cookies.remove("companySelected", { domain: domainName });
};

const redirectToCore = () => {
  const rule = /[h][t]{2}[p]s?[:][\/]{2}/; // eslint-disable-line
  const urlToRedirect = `${window.location.href.replace(rule, "")}`;

  window.location.href = `${links.web.core}/?redirect_to=${urlToRedirect}`;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const encodedToken = Cookies.get("authToken");
    const encodedExpiresIn = Cookies.get("expiresIn");
    const encodedUser = Cookies.get("user");

    try {
      const token = encodedToken && decode(encodedToken);
      const expiresIn = encodedExpiresIn && decode(encodedExpiresIn);
      const user = encodedUser && decode(encodedUser);
      if (token && expiresIn && user) {
        return { token, expiresIn, user: JSON.parse(user) as IUser };
      }
    } catch (error) {
      signOut();

      return {} as AuthState;
    }
    signOut();

    return {} as AuthState;
  });

  function signOut() {
    removeAuthCookies();
    window.localStorage.removeItem("avatar");

    redirectToCore();
  }

  const updateUser = useCallback(
    (user: IUser) => {
      Cookies.set("user", encode(JSON.stringify(user)));
      setData(prevState => ({
        ...prevState,
        user,
      }));
    },
    [setData],
  );

  const doRefreshToken = useCallback(async () => {
    try {
      const currentRefreshToken = Cookies.get("refreshToken");

      if (!currentRefreshToken) return null;

      const { data: response } = await axios.post(`${links.api.core}/refresh-token`, {
        refresh_token: decode(currentRefreshToken),
      });

      Cookies.set("authToken", encode(response.token), {
        domain: domainName,
      });

      Cookies.set("refreshToken", encode(response.refreshToken), {
        domain: domainName,
      });

      return response.token;
    } catch (error) {
      signOut();
    }

    return null;
  }, []);

  const refreshToken = useCallback(() => {
    let token = Cookies.get("authToken");
    if (token) {
      token = decode(token);
      axios({
        url: "/refresh",
        baseURL: `${links.api.core}/auth`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          const { access_token, expires_in } = response.data;
          const jwt: any = jwtDecode(access_token);
          const user = JSON.stringify(jwt.user);

          Cookies.set("authToken", encode(access_token), {
            domain: domainName,
          });
          Cookies.set("expiresIn", encode(expires_in.toString()), {
            domain: domainName,
          });
          Cookies.set("user", encode(user), {
            domain: domainName,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []); // eslint-disable-line

  const tokenTimeout = () => {
    const expiresIn = Cookies.get("expiresIn");

    if (expiresIn) {
      let decodedTime = Number(decode(expiresIn));

      if (decodedTime <= 3000) {
        refreshToken();
      } else {
        const newTime = decodedTime - 1;
        Cookies.set("expiresIn", encode(newTime.toString()), {
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

async function validateToken(verifyTokenData: VerifyTokenData): Promise<boolean> {
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

function getSignedUser(): IUser | false {
  try {
    const encodedUser = Cookies.get("user");
    const user = encodedUser && decode(encodedUser);

    if (user) {
      return JSON.parse(user);
    }

    return false;
  } catch (error) {
    return false;
  }
}

export { AuthContext, AuthProvider, validateToken, getSignedUser };
