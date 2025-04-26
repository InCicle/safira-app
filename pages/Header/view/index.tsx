import { TFunction } from 'i18next';
import { HeaderInStyle } from './styles';
import { FC, JSX, RefObject } from 'react';
import { IUser } from '@/safira-app/interfaces/User';
import { MeProps } from '@/safira-app/interfaces/Me';
import { ToastUI } from '@/safira-app/components/Toast';
import { HeaderMobile } from '../components/headerMobile';
import { HeaderDesktop } from '../components/headerDesktop';
import WhatsAppButton from '@/safira-app/components/WhatsAppButton';
import ModulesMenu, { ModulesMenuRef } from '@/safira-app/pages/Header/components/modulesMenu';
import ProfileMenu, { ProfileMenuRef } from '@/safira-app/pages/Header/components/profileMenu';

export interface HeaderViewProps {
  me: MeProps;
  t: TFunction<'translation', undefined>;
  user: IUser;
  hasResult: boolean;
  accountType: string;
  inputBoxClassName: string;
  openMenuCompanies: boolean;
  companies: Array<{ name: string }>;
  selectedCompany: { name: string };
  anchorCompaniesEl: HTMLElement | null;
  resultSearch: Array<any>;
  activeManagerMenu: boolean;
  anchorRef: RefObject<HTMLFormElement | null>;
  modulesMenuRef: RefObject<ModulesMenuRef | null>;
  profileMenuRef: RefObject<ProfileMenuRef | null>;
  handleOpenMenuCompanies: (ev: any) => void;
  handleCloseMenuCompanies: () => void;
  changeChipContent: (index: number) => void;
  companiesAvatar: () => JSX.Element;
  setInputBoxClassName: (className: string) => void;
  searchFunction: (value: string) => void;
  handleOpenModulesMenu: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOpenMenuProfile: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  getLogoUrl: () => {
    logoUrl: string;
    isPublicUrl: boolean;
  };
}

export const HeaderView: FC<HeaderViewProps> = ({
  me,
  user,
  accountType,
  activeManagerMenu,
  anchorCompaniesEl,
  companiesAvatar,
  companies,
  handleCloseMenuCompanies,
  changeChipContent,
  handleOpenMenuCompanies,
  handleOpenMenuProfile,
  handleOpenModulesMenu,
  hasResult,
  inputBoxClassName,
  setInputBoxClassName,
  getLogoUrl,
  modulesMenuRef,
  openMenuCompanies,
  resultSearch,
  searchFunction,
  selectedCompany,
  anchorRef,
  t,
  profileMenuRef,
}) => {
  const isDesktop = window.innerWidth > 600;
  return (
    <>
      <HeaderInStyle role="heading" className="incicleheader">
        <ToastUI />
        <ModulesMenu ref={modulesMenuRef} activeManagerMenu={activeManagerMenu} />
        <ProfileMenu ref={profileMenuRef} />
        {isDesktop ? (
          <HeaderDesktop
            accountType={accountType}
            me={me}
            user={user}
            t={t}
            hasResult={hasResult}
            inputBoxClassName={inputBoxClassName}
            openMenuCompanies={openMenuCompanies}
            companies={companies}
            selectedCompany={selectedCompany}
            anchorCompaniesEl={anchorCompaniesEl}
            resultSearch={resultSearch}
            anchorRef={anchorRef}
            handleOpenMenuCompanies={handleOpenMenuCompanies}
            handleCloseMenuCompanies={handleCloseMenuCompanies}
            changeChipContent={changeChipContent}
            companiesAvatar={companiesAvatar}
            setInputBoxClassName={setInputBoxClassName}
            searchFunction={searchFunction}
            handleOpenModulesMenu={handleOpenModulesMenu}
            handleOpenMenuProfile={handleOpenMenuProfile}
            getLogoUrl={getLogoUrl}
          />
        ) : (
          <HeaderMobile
            anchorRef={anchorRef}
            me={me}
            t={t}
            hasResult={hasResult}
            inputBoxClassName={inputBoxClassName}
            resultSearch={resultSearch}
            handleOpenModulesMenu={handleOpenModulesMenu}
            setInputBoxClassName={setInputBoxClassName}
            searchFunction={searchFunction}
            handleOpenMenuProfile={handleOpenMenuProfile}
            getLogoUrl={getLogoUrl}
          />
        )}
      </HeaderInStyle>
      <WhatsAppButton />
    </>
  );
};
