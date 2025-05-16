import React, { useImperativeHandle, useState } from 'react';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';

// icons
import { useTranslation } from 'react-i18next';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import School from '@mui/icons-material/School';

import { links } from '@/safira-app/config/links';
import TutorialVideos from '@/safira-app/pages/TutorialVideos';
import { translation } from '@/safira-app/utils/translation';
import { useProfile } from '@/safira-app/hooks/useProfile';
import { RenderAvatar } from '@/safira-app/components/RenderAvatar';
import { MenuItemLink } from './menuItemLink';

export type ProfileMenuRef = {
  openProfileMenu: (ev: any) => void;
  closeProfileMenu: () => void;
};

const ProfileMenu: React.ForwardRefRenderFunction<ProfileMenuRef> = (_, ref) => {
  const { me } = useProfile();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [openTutorial, setOpenTutorial] = useState(false);

  function handleSignOut() {
    window.location.href = links.web.core + '/?signout=true';
  }

  function openDropdown(ev: any) {
    setAnchorEl(ev.currentTarget);
  }

  function closeDropdown() {
    setAnchorEl(null);
  }

  function getMenuItemUrl() {
    const personUrl = `${links.web.social}/friends`;
    const companyUrl = `${links.web.department}/#/collaborators`;
    return me?.type === 'PERSON' ? personUrl : me?.type === 'COMPANY' ? companyUrl : '#';
  }

  useImperativeHandle(ref, () => {
    return {
      openProfileMenu: openDropdown,
      closeProfileMenu: closeDropdown,
    };
  });

  return (
    <>
      {openTutorial && <TutorialVideos open={openTutorial} setOpen={setOpenTutorial} />}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeDropdown}
        onClick={closeDropdown}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              maxWidth: '250px',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },

              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
              '& li, & a': {
                fontFamily: '"Open Sans", sans-serif',
                fontSize: '13px',
              },
              span: {
                fontSize: '13px',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItemLink
          href={`${links.web.social}/p/${me?.username}`}
          icon={
            <RenderAvatar
              src={me?.avatar}
              sx={{
                width: '32px !important',
                height: '32px !important',
                marginRight: 15,
              }}
            />
          }
        >
          {me?.social_name && me.social_name.length > 40 ? `${me?.social_name.substring(0, 40)}...` : me?.social_name}
        </MenuItemLink>
        <Divider />
        <MenuItemLink href={getMenuItemUrl()} icon={<PeopleAltIcon fontSize="small" />}>
          {translation(t, me?.type === 'PERSON' ? 'friends' : 'collaborators')}
        </MenuItemLink>
        <Divider />
        <MenuItem onClick={() => setOpenTutorial(true)}>
          <ListItemIcon>
            <School fontSize="small" />
          </ListItemIcon>
          <span>{translation(t, 'tutorials')}</span>
        </MenuItem>
        <MenuItemLink href={links.web.settings} icon={<SettingsIcon fontSize="small" />}>
          {translation(t, 'configurations')}
        </MenuItemLink>
        <MenuItem onClick={() => handleSignOut()}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span>{translation(t, 'leave')}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.forwardRef(ProfileMenu);
