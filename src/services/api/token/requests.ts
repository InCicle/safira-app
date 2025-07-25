import { links } from '@/utils/links';
import { api } from '@/services/api';

interface TokenResponse {
  access_token: string;
  expires_in: string | number;
}

export async function getRefreshToken(): Promise<TokenResponse> {
  const response = await api.get(`${links.api.auth}/refresh`);

  return response.data;
}
