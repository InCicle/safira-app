import { IMe } from '@/interfaces/Me';
import { api } from '@/services/api';

export async function getMe(): Promise<{
  data: IMe;
}> {
  return api.get(`http://localhost:3000/api/me`);
}
