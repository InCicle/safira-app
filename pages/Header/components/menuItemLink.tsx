import { ListItemIcon, MenuItem } from '@mui/material';

type MenuItemLinkProps = {
  href?: string;
  icon: React.ReactElement;
};

export const MenuItemLink: React.FC<React.PropsWithChildren<MenuItemLinkProps>> = ({ children, href, icon }) => (
  <MenuItem
    component="a"
    href={href}
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: 'initial !important',
      textTransform: 'capitalize',
      overflowWrap: 'anywhere',
      whiteSpace: 'break-spaces',
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <span>{children}</span>
  </MenuItem>
);
