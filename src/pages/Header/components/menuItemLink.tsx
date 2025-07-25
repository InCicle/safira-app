import { ListItemIcon, MenuItem } from '@mui/material';

type MenuItemLinkProps = {
  href?: string;
  icon: React.ReactElement;
};

export const MenuItemLink: React.FC<React.PropsWithChildren<MenuItemLinkProps>> = ({ children, href, icon }) => (
  <MenuItem
    component="a"
    href={href}
    id="menu-item-link"
    sx={{
      display: 'flex',
      alignItems: 'center',
      width: 'initial !important',
      textTransform: 'capitalize',
      overflowWrap: 'anywhere',
      whiteSpace: 'break-spaces',
      color: 'rgb(117, 117, 117);',
    }}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <span>{children}</span>
  </MenuItem>
);
