import React, { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type InputType = React.InputHTMLAttributes<HTMLInputElement>['type'];

interface InputProps extends UseControllerProps {
  label: string;
  type?: InputType;
  icon?: any;
}

export const Input: React.FC<InputProps> = ({ name, control, label, type = 'text', icon, ...rest }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  const [inputType, setInputType] = useState<InputType>(type);

  const togglePasswordVisibility = () => {
    setInputType(prev => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <TextField
      label={label}
      type={inputType}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      fullWidth
      InputProps={{
        startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined,
        endAdornment:
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {inputType === 'password' ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined,
      }}
      {...rest}
    />
  );
};
