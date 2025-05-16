import { ModulesMenuRef } from '@/safira-app/pages/Header/components/modulesMenu';
import { ProfileMenuRef } from '@/safira-app/pages/Header/components/profileMenu';
import { domainName } from '@/safira-app/utils/domainName';
import { usePermissions } from '@/safira-app/hooks/usePermissions';
import { MeProps } from '@/safira-app/interfaces/Me';
import { IProfile } from '@/safira-app/interfaces/Profile';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HeaderView } from '../view';
import { companiesAvatar } from '../components/companiesAvatar';
import { getProfile } from '@/safira-app/services/queries/profile/requests';
import { NotificationProvider } from '@/safira-app/contexts/NotificationContext';
import { useProfile } from '@/safira-app/hooks/useProfile';
import { useAuth } from '@/safira-app/hooks/useAuth';

export const HeaderController: React.FC = () => {
  const { me } = useProfile();
  const { user } = useAuth();
  const { companyId, checkPermission, permissionsList } = usePermissions();
  const [resultSearch, setResultSearch] = useState([] as IProfile[]);
  const [hasResult, setHasResult] = useState(false);
  const [companies, setCompanies] = useState<any>([]);
  const [accountType, setAccountType] = useState('COMPANY');
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [inputBoxClassName, setInputBoxClassName] = useState('');
  const [activeManagerMenu, setActiveManagerPanel] = useState(false);
  const [anchorCompanyEl, setAnchorCompanyEl] = useState(null);
  const modulesMenuRef = useRef<ModulesMenuRef | null>(null);
  const profileMenuRef = useRef<ProfileMenuRef | null>(null);
  const anchorRef = useRef<HTMLFormElement | null>(null);

  const openMenuCompanys = Boolean(anchorCompanyEl);
  const INCICLE_LOGO = 'https://static-incicle.s3.amazonaws.com/logo_incicle.svg';
  const contentSideBarElement = document.querySelector('.contentSidebar > div') as any;

  const getManagerPermission = useCallback(() => {
    if (user.type === 'COMPANY' || !me || !me?.companies) return;
    const companySelected = me.companies.find(company => company.id === companyId);
    if (!companySelected) return;
    if (
      !!companySelected.is_manager_competence ||
      checkPermission(['managers_vacations_list']) ||
      checkPermission(['managers_list_occurrences']) ||
      checkPermission(['in_check'])
    ) {
      setActiveManagerPanel(true);
    }
  }, [user.type, me, companyId, checkPermission]);

  const getCompany = useCallback(() => {
    if (me?.type === 'PERSON') {
      setAccountType('PERSON');
      if (me?.companies.length > 0) {
        const companySelected = Cookies.get('companySelected');
        if (!companySelected) {
          Cookies.set('companySelected', me?.companies[0].id, { domain: domainName });
          setSelectedCompany(me?.companies[0]);
        } else {
          const comp = me?.companies.find(company => company.id === companySelected);
          setSelectedCompany(comp);
        }

        setCompanies(me?.companies);
      }
    }
  }, [me]);

  useEffect(() => {
    getManagerPermission();
  }, [permissionsList, getManagerPermission]);

  useEffect(() => {
    getCompany();
  }, [me, getCompany]);

  useEffect(() => {
    changeSidebarDisplay();
    window.addEventListener('resize', changeSidebarDisplay);

    return () => {
      window.removeEventListener('resize', changeSidebarDisplay);
    };
  }, []);

  useEffect(() => {
    clearInputClassName();
    window.addEventListener('resize', clearInputClassName);

    return () => {
      window.removeEventListener('resize', clearInputClassName);
    };
  }, []);

  function clearInputClassName() {
    if (window.innerWidth > 1200 && inputBoxClassName.length) setInputBoxClassName('');
  }

  function changeSidebarDisplay() {
    if (!contentSideBarElement) return;
    if (window.innerWidth < 800) {
      contentSideBarElement!.style.display = 'none';
      return;
    }

    contentSideBarElement!.style.display = 'initial';
  }

  function getLogoUrl() {
    let isPublicUrl = true;
    let logoUrl = '';

    if (me?.type === 'PERSON') {
      const companyLogo = getLogoFromCompanies(selectedCompany?.id, companies);
      logoUrl = companyLogo ? companyLogo : INCICLE_LOGO;
      isPublicUrl = !companyLogo;
    } else if (me?.type === 'COMPANY') {
      logoUrl = me?.logo || INCICLE_LOGO;
      isPublicUrl = !me?.logo;
    }
    console.log('logoUrl', logoUrl);
    console.log('isPublicUrl', isPublicUrl);

    return { logoUrl, isPublicUrl };
  }

  function getLogoFromCompanies(companyId: string, companies: MeProps['companies']) {
    const company = companies.find(item => item.id === companyId);
    return company?.logo || '';
  }

  function searchFunction(username: string) {
    setResultSearch([]);
    setHasResult(false);
    if (username.trim().length >= 3) {
      getProfile(username)
        .then((response: any) => {
          setResultSearch(response?.data);
          setHasResult(true);
        })
        .catch(() => {
          setHasResult(false);
        });

      setHasResult(false);
    }
  }

  function handleOpenMenuCompanies(ev: any) {
    setAnchorCompanyEl(ev.currentTarget);
  }

  function handleCloseMenuCompanies() {
    setAnchorCompanyEl(null);
  }

  function handleOpenMenuProfile(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    profileMenuRef.current?.openProfileMenu(ev);
  }

  function handleOpenModulesMenu(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    modulesMenuRef.current?.openDropdown(ev);
  }

  function changeChipContent(index: number) {
    Cookies.remove('companySelected');
    const companyId = companies[index].id;
    Cookies.set('companySelected', companyId, { domain: domainName });
    window.location.reload();
  }

  const { logoUrl, isPublicUrl } = getLogoUrl();

  return (
    <NotificationProvider>
      <HeaderView
        userAvatar={me?.avatar}
        anchorRef={anchorRef}
        hasResult={hasResult}
        companies={companies}
        logoUrl={logoUrl}
        isPublicUrl={isPublicUrl}
        accountType={accountType}
        resultSearch={resultSearch}
        modulesMenuRef={modulesMenuRef}
        profileMenuRef={profileMenuRef}
        searchFunction={searchFunction}
        companiesAvatar={companiesAvatar}
        selectedCompany={selectedCompany}
        anchorCompaniesEl={anchorCompanyEl}
        openMenuCompanies={openMenuCompanys}
        inputBoxClassName={inputBoxClassName}
        changeChipContent={changeChipContent}
        activeManagerMenu={activeManagerMenu}
        setInputBoxClassName={setInputBoxClassName}
        handleOpenMenuProfile={handleOpenMenuProfile}
        handleOpenModulesMenu={handleOpenModulesMenu}
        handleOpenMenuCompanies={handleOpenMenuCompanies}
        handleCloseMenuCompanies={handleCloseMenuCompanies}
      />
    </NotificationProvider>
  );
};
