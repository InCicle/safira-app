import { IconButton } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import { FC } from 'react';

interface ModulesMenuButtonProps {
  handleOpenModulesMenu: (ev: any) => void;
}

export const ModulesMenuButton: FC<ModulesMenuButtonProps> = ({ handleOpenModulesMenu }) => {
  return (
    <label className="incicleheader-desktopmodules-label" htmlFor="incicleheader-modules-checkbox">
      <IconButton onClick={handleOpenModulesMenu}>
        <AppsIcon
          sx={{
            width: '24px !important',
            height: '24px !important',
            fill: '#008AC1',
          }}
        />
      </IconButton>
    </label>
  );
};
