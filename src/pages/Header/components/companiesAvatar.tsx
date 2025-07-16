import { Avatar } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';

export const companiesAvatar = () => {
  return (
    <Avatar
      sx={{
        width: '24px !important',
        height: '24px !important',
        marginLeft: '2px !important',
        marginRight: '1px !important',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <WorkIcon sx={{ width: '62%' }} />
    </Avatar>
  );
};
