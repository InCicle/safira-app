import { HeaderMobileProps } from '../interfaces';
import { Link, Stack } from '@mui/material';
import { FC } from 'react';
import { ModulesMenuButton } from './modulesMenuButton';
import { SearchInput } from './searchInput';
import { AvatarProfile } from './avatarProfile';
import Notifications from '@/pages/Notifications';
import CompanyLogo from './CompanyLogo';
import { links } from '@/utils/links';

export const HeaderMobile: FC<HeaderMobileProps> = ({
  anchorRef,
  hasResult,
  userAvatar,
  resultSearch,
  inputBoxClassName,
  searchFunction,
  handleOpenModulesMenu,
  setInputBoxClassName,
  handleOpenMenuProfile,
}) => {
  return (
    <>
      <section
        className="incicleheader-content"
        data-testid="header-mobile-start"
      >
        <nav style={{ alignItems: 'center', display: 'flex' }}>
          <ModulesMenuButton handleOpenModulesMenu={handleOpenModulesMenu} />
          <SearchInput
            anchorRef={anchorRef}
            hasResult={hasResult}
            inputBoxClassName={inputBoxClassName}
            resultSearch={resultSearch}
            searchFunction={searchFunction}
            setInputBoxClassName={setInputBoxClassName}
          />
        </nav>
      </section>

      <section
        className="incicleheader-content center"
        data-testid="header-mobile-center"
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
        </nav>
      </section>

      <section
        className="incicleheader-content flex-end"
        data-testid="header-mobile-end"
      >
        <nav>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
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
