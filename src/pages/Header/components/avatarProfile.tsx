import { IconButton } from '@mui/material';
import { RenderAvatar } from '@/components/renderAvatar';
import { FC } from 'react';

interface AvatarProfileProps {
  avatar: string;
  handleOpen: (ev: any) => void;
}

export const AvatarProfile: FC<AvatarProfileProps> = ({
  handleOpen,
  avatar,
}) => {
  return (
    <IconButton
      className="incicleheader-avatar"
      onClick={handleOpen}
      size="small"
      style={{ marginRight: 15 }}
    >
      <RenderAvatar
        alt="avatar-profile"
        sx={{ width: 35, height: 35 }}
        src={avatar}
        save
      />
    </IconButton>
  );
};
