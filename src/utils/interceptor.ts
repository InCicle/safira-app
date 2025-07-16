import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { decode } from '@/utils/crypto';
import { IToken } from '@/interfaces/Token';
import { api } from '@/services/api';

export interface InterceptorDependencies {
  signOut: () => void;
  refreshToken: () => Promise<string | null>;
  companyId: string | null;
  companyIdExceptions?: string[];
}

function isRefreshTokenRequest(url?: string): boolean {
  return !!url?.includes('refresh-token');
}

function isExceptionUrl(
  url: string | undefined,
  exceptions: string[] = [],
): boolean {
  return exceptions.includes(url || '');
}

function decodeAndCheckExpiration(token: string): {
  token: string;
  expired: boolean;
} {
  const decoded = decode(token);
  const decrypted = jwtDecode<IToken>(decoded);
  const expiration = new Date(decrypted.exp * 1000).getTime();
  const now = Date.now();
  const expired = expiration - now <= 10;
  return { token: decoded, expired };
}

function attachHeaders(
  request,
  companyId: string | null,
  token?: string,
  skipCompanyId?: boolean,
) {
  return {
    ...request,
    headers: {
      ...request.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(companyId && !skipCompanyId && { companyId }),
    },
  };
}

async function getValidToken(
  token: string | undefined,
  refreshToken: () => Promise<string | null>,
  signOut: () => void,
): Promise<string | undefined> {
  if (token) {
    try {
      const { token: decoded, expired } = decodeAndCheckExpiration(token);
      if (!expired) return decoded;
    } catch {
      signOut();
    }
  }
  return (await refreshToken()) || undefined;
}

export function createInterceptor(dependencies: InterceptorDependencies) {
  const { signOut, refreshToken, companyId, companyIdExceptions } =
    dependencies;

  const interceptRequest = () => {
    api.interceptors.request.use(async (request) => {
      const url = request?.url || '';
      if (isRefreshTokenRequest(url)) return request;

      const isException = isExceptionUrl(url, companyIdExceptions);
      const rawToken = Cookies.get('authToken');
      const validToken = await getValidToken(rawToken, refreshToken, signOut);

      return attachHeaders(request, companyId, validToken, isException);
    });
  };

  const interceptResponse = () => {
    api.interceptors.response.use((response) => {
      const tokenExists = Boolean(Cookies.get('authToken'));
      const unauthorized = response?.status === 401;

      if (tokenExists && unauthorized) {
        signOut();
      }

      return response;
    });
  };

  return { interceptRequest, interceptResponse };
}
