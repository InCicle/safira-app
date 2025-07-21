import { FC } from 'react';
import { HeaderInStyle } from '../components/headerInStyle';
import { Toast } from '@/pages/Header/components/toast';
import { HeaderMobile } from '@/pages/Header/components/headerMobile';
import { HeaderDesktop } from '@/pages/Header/components/headerDesktop';
import ModulesMenu, { ModulesMenuProps } from '@/pages/Header/components/modulesMenu';
import ProfileMenu, { ProfileMenuProps } from '@/pages/Header/components/profileMenu';
import { HeaderDesktopProps } from '../interfaces';

export interface HeaderViewProps extends HeaderDesktopProps, ModulesMenuProps, ProfileMenuProps {}

export const HeaderView: FC<HeaderViewProps> = ({
  profile,
  collaborators,
  hasResult,
  anchorRef,
  userAvatar,
  accountType,
  menuItemUrl,
  resultSearch,
  openTutorial,
  selectedCollaborator,
  activeManagerMenu,
  anchorCompaniesEl,
  inputBoxClassName,
  anchorMenuModulesEl,
  filteredUserModules,
  anchorProfileMenuEl,
  filteredCollaboratorsModules,
  searchFunction,
  changeChipContent,
  setInputBoxClassName,
  handleOpenModulesMenu,
  handleOpenMenuProfile,
  handleOpenMenuCompanies,
  handleCloseMenuCompanies,
  closeModulesMenu,
  getModuleUrl,
  closeProfileMenu,
  setOpenTutorial,
}) => {
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth > 600 : true;
  return (
    <>
      <HeaderInStyle role="heading">
        <Toast />
        <ModulesMenu
          activeManagerMenu={activeManagerMenu}
          anchorMenuModulesEl={anchorMenuModulesEl}
          closeModulesMenu={closeModulesMenu}
          filteredCollaboratorsModules={filteredCollaboratorsModules}
          filteredUserModules={filteredUserModules}
          getModuleUrl={getModuleUrl}
        />
        <ProfileMenu
          anchorProfileMenuEl={anchorProfileMenuEl}
          closeProfileMenu={closeProfileMenu}
          menuItemUrl={menuItemUrl}
          openTutorial={openTutorial}
          setOpenTutorial={setOpenTutorial}
          profile={profile}
        />
        {isDesktop ? (
          <HeaderDesktop
            collaborators={collaborators}
            hasResult={hasResult}
            anchorRef={anchorRef}
            userAvatar={userAvatar}
            accountType={accountType}
            resultSearch={resultSearch}
            selectedCollaborator={selectedCollaborator}
            inputBoxClassName={inputBoxClassName}
            anchorCompaniesEl={anchorCompaniesEl}
            openMenuCompanies={Boolean(anchorCompaniesEl)}
            searchFunction={searchFunction}
            changeChipContent={changeChipContent}
            setInputBoxClassName={setInputBoxClassName}
            handleOpenModulesMenu={handleOpenModulesMenu}
            handleOpenMenuProfile={handleOpenMenuProfile}
            handleOpenMenuCompanies={handleOpenMenuCompanies}
            handleCloseMenuCompanies={handleCloseMenuCompanies}
          />
        ) : (
          <HeaderMobile
            userAvatar={userAvatar}
            anchorRef={anchorRef}
            hasResult={hasResult}
            inputBoxClassName={inputBoxClassName}
            resultSearch={resultSearch}
            handleOpenModulesMenu={handleOpenModulesMenu}
            setInputBoxClassName={setInputBoxClassName}
            searchFunction={searchFunction}
            handleOpenMenuProfile={handleOpenMenuProfile}
          />
        )}
      </HeaderInStyle>
    </>
  );
};
