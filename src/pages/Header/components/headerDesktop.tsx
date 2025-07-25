import { Link, Stack } from '@mui/material';
import Notifications from '@/pages/Notifications';
import { FC } from 'react';
import { HeaderDesktopProps } from '../interfaces';
import { ModulesMenuButton } from './modulesMenuButton';
import { SearchInput } from './searchInput';
import { AvatarProfile } from './avatarProfile';
import { ModulesLinks } from './modulesLinks';
import { CompaniesSelect } from './companiesSelect';
import CompanyLogo from './CompanyLogo';
import { links } from '@/utils/links';

export const HeaderDesktop: FC<HeaderDesktopProps> = ({
  hasResult,
  anchorRef,
  collaborators,
  userAvatar,
  accountType,
  resultSearch,
  selectedCollaborator,
  anchorCompaniesEl,
  openMenuCompanies,
  inputBoxClassName,
  searchFunction,
  changeChipContent,
  setInputBoxClassName,
  handleOpenModulesMenu,
  handleOpenMenuProfile,
  handleOpenMenuCompanies,
  handleCloseMenuCompanies,
}) => {
  return (
    <>
      <section
        className="incicleheader-content"
        data-testid="header-desktop-start"
      >
        <nav style={{ alignItems: 'center', display: 'flex' }}>
          <Link
            href={`${links.web?.social}`}
            sx={{
              alignItems: 'center',
              display: 'flex',
              marginRight: '8px',
              marginLeft: '15px',
              paddingBottom: '2px',
              width: 'max-content',
              maxWidth: 180,
              height: 40,
              overflow: 'hidden',
              img: {
                width: 'auto !important',
                height: '100% !important',
              },
            }}
          >
            <CompanyLogo />
          </Link>
          <ModulesLinks accountType={accountType} />
        </nav>
      </section>

      <section
        className="incicleheader-content flex-end"
        data-testid="header-desktop-end"
      >
        <nav>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <CompaniesSelect
              accountType={accountType}
              anchorCompaniesEl={anchorCompaniesEl}
              changeChipContent={changeChipContent}
              collaborators={collaborators}
              handleCloseMenuCompanies={handleCloseMenuCompanies}
              handleOpenMenuCompanies={handleOpenMenuCompanies}
              openMenuCompanies={openMenuCompanies}
              selectedCollaborator={selectedCollaborator}
            />
            <SearchInput
              anchorRef={anchorRef}
              hasResult={hasResult}
              inputBoxClassName={inputBoxClassName}
              resultSearch={resultSearch}
              searchFunction={searchFunction}
              setInputBoxClassName={setInputBoxClassName}
            />
            <ModulesMenuButton handleOpenModulesMenu={handleOpenModulesMenu} />
            <Notifications />
            <AvatarProfile
              handleOpen={handleOpenMenuProfile}
              avatar={userAvatar}
            />
          </Stack>
        </nav>
      </section>
    </>
  );
};
