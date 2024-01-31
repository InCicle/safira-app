import { Button } from '@mui/material';
import { Box, styled as styledMUI } from '@mui/system';

interface IButtonNotification {
  active?: 1 | 0;
}

export const ButtonNotification = styledMUI(Button)(({ active = 0 }: IButtonNotification) => ({
  color: active ? '#266E9E' : '#424242',
  backgroundColor: active ? '#CFEBFF' : '#DEDEDE',
  padding: '3px 6px',
  borderRadius: '4px',
  fontSize: '12px',
  transition: 'filter 0.2s ease-in-out',
  textTransform: 'none',
  boxShadow: 'none !important',
  '&:hover': {
    backgroundColor: active ? '#CFEBFF' : '#DEDEDE',
    filter: 'brightness(0.9)',
  },
}));

export const NotificationWrapper = styledMUI(Box)({
  maxHeight: '60vh',
  overflowY: 'auto',
  scrollbarWidth: 'thin',

  '&::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#a5a5a5',
    borderRadius: '7px',
    boxShadow: 'none',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '#d8d9db',
    borderRadius: '7px',
    boxShadow: 'none',
  },
});
