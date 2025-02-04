import { SxProps, Typography,  Theme } from "@mui/material";

export const NotificationHighlight: React.FC<
  React.PropsWithChildren<{ sx?: SxProps<Theme> }>
> = ({ sx, children }) => {
  return (
    <Typography
      component="label"
      sx={{
        lineHeight: '15px',
        color: '#00558E',
        fontSize: '13px',
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};