import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import School from '@mui/icons-material/School';
import TutorialVideos from '@/pages/TutorialVideos';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { links } from '@/utils/links';
import { translation } from '@/utils/translation';
import { RenderAvatar } from '@/components/renderAvatar';
import { MenuItemLink } from './menuItemLink';
import { useAuth } from '@/hooks/useAuth';

export type ProfileMenuRef = {
  openProfileMenu: (ev) => void;
  closeProfileMenu: () => void;
};

export interface ProfileProps {
  name: string;
  avatar: string;
  type: string;
  username: string;
}

export interface ProfileMenuProps {
  openTutorial: boolean;
  setOpenTutorial: React.Dispatch<React.SetStateAction<boolean>>;
  anchorProfileMenuEl: HTMLButtonElement | null;
  closeProfileMenu: () => void;
  menuItemUrl: string;
  profile: ProfileProps | null;
}

const ProfileMenu: FC<ProfileMenuProps> = ({
  profile,
  menuItemUrl,
  openTutorial,
  anchorProfileMenuEl,
  setOpenTutorial,
  closeProfileMenu,
}) => {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  return (
    <>
      {openTutorial && (
        <TutorialVideos open={openTutorial} setOpen={setOpenTutorial} />
      )}
      <Menu
        data-testid="profile-menu"
        anchorEl={anchorProfileMenuEl}
        onClose={closeProfileMenu}
        onClick={closeProfileMenu}
        open={Boolean(anchorProfileMenuEl)}
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
          href={`${links.web.social}/p/${profile?.username}`}
          icon={
            <RenderAvatar
              src={profile?.avatar}
              save={true}
              sx={{
                width: '32px !important',
                height: '32px !important',
                marginRight: 15,
              }}
            />
          }
        >
          {profile?.name && profile.name.length > 40
            ? `${profile.name.substring(0, 40)}...`
            : profile?.name}
        </MenuItemLink>
        <Divider />
        <MenuItemLink
          href={menuItemUrl}
          icon={<PeopleAltIcon fontSize="small" />}
        >
          {translation(
            t,
            profile?.type === 'PERSON' ? 'friends' : 'collaborators',
          )}
        </MenuItemLink>
        <Divider />
        <MenuItem
          onClick={() => setOpenTutorial(true)}
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
          <ListItemIcon>
            <School fontSize="small" />
          </ListItemIcon>
          <span>{translation(t, 'tutorials')}</span>
        </MenuItem>
        <MenuItemLink
          href={links.web.settings}
          icon={<SettingsIcon fontSize="small" />}
        >
          {translation(t, 'configurations')}
        </MenuItemLink>
        <MenuItem
          onClick={() => signOut()}
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
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <span>{translation(t, 'leave')}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
