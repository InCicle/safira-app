import { toast, ToastContainerProps } from 'react-toastify';

interface ToastProps extends ToastContainerProps {
  appearance?: 'error' | 'success' | 'warning' | 'info';
}

type ToastFn = (message: React.ReactNode, toastProps?: ToastProps) => void;

export const addToast: ToastFn = (message, toastProps) => {
  const appearance = toastProps?.appearance || 'info';

  toast[appearance](message, toastProps);
};
