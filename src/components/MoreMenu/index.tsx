import { FC, PropsWithChildren } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu } from '@mui/material';

interface MoreOptionsMenuProps {
  anchorEl: HTMLButtonElement | null;
  handleOpen: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleClose: () => void;
}

export const MoreOptionsMenu: FC<PropsWithChildren<MoreOptionsMenuProps>> = ({
  anchorEl,
  handleOpen,
  handleClose,
  children,
}) => {
  return (
    <>
      <IconButton onClick={handleOpen}>
        <MoreHorizIcon sx={{ width: 20, height: 20 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: { boxShadow: '0 0px 8px 1px rgba(0, 0, 0, 0.1)' },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {children}
      </Menu>
    </>
  );
};
