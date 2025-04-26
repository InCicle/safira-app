import { useContext } from 'react';
import { HeaderContext } from '../contexts/HeaderContext';

export function useHeaderProvider() {
  const context = useContext(HeaderContext);
  return context;
}
