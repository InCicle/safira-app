import { useContext } from 'react';
import { ProfileContext } from '@/contexts/Profile/Context';

export function useProfile() {
  return useContext(ProfileContext);
}
