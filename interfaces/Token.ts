import { IUser } from '@/safira-app/interfaces/User';

export interface IToken {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  sub: string;
  user: IUser;
}
