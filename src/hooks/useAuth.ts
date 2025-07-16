import { useContext } from 'react';
import { AuthContext } from '@/contexts/Auth/Context';

export function useAuth(): AuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
