import { IUser } from '@/interfaces/User';
import { createContext } from 'react';

export interface AuthContext {
  user: IUser;
  signOut(): void;
  updateUser(user: IUser): void;
  refreshToken(): Promise<string | null>;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);
