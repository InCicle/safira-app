import { FC } from 'react';
import { Avatar, Chip, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkIcon from '@mui/icons-material/Work';
import { maxLetters } from '@/utils/maxLetters';
import { companiesAvatar } from './companiesAvatar';
import { CollaboratorsInterface } from '@/interfaces/Me';

interface CompaniesSelectProps {
  collaborators: CollaboratorsInterface[];
  selectedCollaborator?: CollaboratorsInterface;
  accountType: string;
  openMenuCompanies: boolean;
  anchorCompaniesEl: null | HTMLElement;
  handleOpenMenuCompanies: (ev) => void;
  handleCloseMenuCompanies: () => void;
  changeChipContent: (index: number) => void;
}

export const CompaniesSelect: FC<CompaniesSelectProps> = ({
  accountType,
  anchorCompaniesEl,
  changeChipContent,
  collaborators,
  handleCloseMenuCompanies,
  handleOpenMenuCompanies,
  openMenuCompanies,
  selectedCollaborator,
}) => {
  const isPersonWithCompanies =
    collaborators.length > 0 && accountType === 'PERSON';
  return (
    <div className="incicleheader-companies">
      {isPersonWithCompanies && (
        <Chip
          key={1}
          onClick={handleOpenMenuCompanies}
          size="small"
          clickable
          avatar={companiesAvatar()}
          label={
            <span style={{ fontSize: '13px' }}>
              {maxLetters(selectedCollaborator?.company.name ?? '', 200)}
            </span>
          }
          onDelete={handleOpenMenuCompanies}
          deleteIcon={<ArrowDropDownIcon />}
          variant="outlined"
          sx={{ padding: '2px !important', height: '32px' }}
        />
      )}
      <Menu
        key={2}
        anchorEl={anchorCompaniesEl}
        open={openMenuCompanies}
        onClose={handleCloseMenuCompanies}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
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
                fontSize: '12px',
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {collaborators.map(({ company }, index) => (
          <MenuItem
            key={index}
            component="li"
            onClick={() => {
              changeChipContent(index);
              handleCloseMenuCompanies();
            }}
          >
            <Avatar alt={company.name}>
              <WorkIcon />
            </Avatar>
            <span style={{ padding: '0 !important' }}>{company.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
