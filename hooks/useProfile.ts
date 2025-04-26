import { useContext } from 'react';
import { ProfileContext } from '@/safira-app/contexts/ProfileContext';

export function useProfile() {
  return useContext(ProfileContext);
}
