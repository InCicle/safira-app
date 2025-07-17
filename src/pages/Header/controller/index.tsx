import { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ModulesMenuRef } from '@/pages/Header/components/modulesMenu';
import { ProfileMenuRef, ProfileProps } from '@/pages/Header/components/profileMenu';
import { HeaderView } from '../view';
import { IMeCollaborators } from '@/interfaces/Me';
import { IProfile } from '@/interfaces/Profile';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';
import { usePermissionsStore } from '@/store/usePermissionsStore';
import { getProfile } from '@/services/api/profile/requests';
import NotificationProvider from '@/contexts/Notification/Provider';
import { CollaboratorsMenuModules, ModulesType, UserMenuModules } from '@/utils/modules';
import { links } from '@/utils/links';
import { URL_STEP_ONE } from '@/utils/constants';
import Cookies from 'js-cookie';
import { domainName } from '@/utils/auth';
import { hasManagerPermissions } from '@/utils/hasManagerPanel';

export const HeaderController: React.FC = () => {
  const { user } = useAuthStore();
  const { me, companyId, setCompanyId } = useProfileStore();
  const { checkPermission, permissions } = usePermissionsStore();

  const anchorRef = useRef<HTMLFormElement | null>(null);
  const modulesMenuRef = useRef<ModulesMenuRef | null>(null);
  const profileMenuRef = useRef<ProfileMenuRef | null>(null);

  const [hasResult, setHasResult] = useState(false);
  const [openTutorial, setOpenTutorial] = useState(false);
  const [anchorCompaniesEl, setAnchorCompanyEl] = useState(null);
  const [inputBoxClassName, setInputBoxClassName] = useState('');
  const [resultSearch, setResultSearch] = useState<IProfile[]>([]);
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [activeManagerMenu, setActiveManagerPanel] = useState(false);
  const [filteredUserModules, setFilteredUserModules] = useState<ModulesType[]>([]);
  const [collaborators, setCollaborators] = useState<IMeCollaborators[]>([]);
  const [accountType, setAccountType] = useState('');
  const [selectedCollaborator, setSelectedCollaborator] = useState<IMeCollaborators>();
  const [anchorMenuModulesEl, setAnchorModulesMenuEl] = useState<HTMLButtonElement | null>(null);
  const [anchorProfileMenuEl, setAnchorProfileMenuEl] = useState<HTMLButtonElement | null>(null);
  const [filteredCollaboratorsModules, setFilteredCollaboratorsModules] = useState<ModulesType[]>([]);

  const contentSideBarElement = document.querySelector('.contentSidebar > div') as HTMLDivElement | null;

  const clearInputClassName = useCallback(() => {
    if (window.innerWidth > 1200 && inputBoxClassName.length) setInputBoxClassName('');
  }, [inputBoxClassName]);

  const changeSidebarDisplay = useCallback(() => {
    if (!contentSideBarElement) return;
    if (window.innerWidth < 800) {
      contentSideBarElement!.style.display = 'none';
      return;
    }

    contentSideBarElement!.style.display = 'initial';
  }, [contentSideBarElement]);

  const getCompany = useCallback(() => {
    if (me?.type !== 'PERSON') return;
    setAccountType('PERSON');
    if (me?.collaborators?.length > 0) {
      const companySelected = Cookies.get('companySelected');
      if (!companySelected) {
        Cookies.set('companySelected', me?.collaborators[0].company.id, {
          domain: domainName,
        });
        setCompanyId(me?.collaborators[0].company.id);
        setSelectedCollaborator(me?.collaborators[0]);
      } else {
        const comp = me?.collaborators.find(col => col.company.id === companySelected);
        setSelectedCollaborator(comp);
      }
    }

    setCollaborators(me?.collaborators);
  }, [me]);

  const getManagerPermission = useCallback(() => {
    if (!user || user.type === 'COMPANY' || !me || !me?.collaborators) return;
    const companySelected = me.collaborators.find(({ company }) => company.id === companyId);
    if (!companySelected) return;
    const isManager = hasManagerPermissions(user, checkPermission, companySelected);
    setActiveManagerPanel(isManager);
  }, [user, me, companyId, checkPermission]);

  useEffect(() => {
    setFilteredUserModules(
      UserMenuModules.filter(item => {
        if (!user) return false;
        return item.accountTypes.includes(user.type);
      })
        .filter(itemModule => {
          if (!itemModule.enableOnlyTo || !companyId) return true;
          return itemModule.enableOnlyTo.includes(companyId);
        })
        .filter(moduleItem => {
          if (!moduleItem.permission) return true;
          return checkPermission([moduleItem.permission]);
        }),
    );
    setFilteredCollaboratorsModules(
      CollaboratorsMenuModules.filter(item => {
        if (!user) return false;
        return item.accountTypes.includes(user.type);
      })
        .filter(moduleItem => {
          if (!moduleItem.enableOnlyTo || !companyId) return true;
          return moduleItem.enableOnlyTo.includes(companyId);
        })
        .filter(moduleItem => {
          if (!moduleItem.permission) return true;
          return checkPermission([moduleItem.permission]);
        }),
    );
  }, [user, companyId, checkPermission, permissions]);

  useEffect(() => {
    getManagerPermission();
  }, [permissions, getManagerPermission]);

  useEffect(() => {
    getCompany();
  }, [me, getCompany]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    changeSidebarDisplay();
    clearInputClassName();

    window.addEventListener('resize', changeSidebarDisplay);
    window.addEventListener('resize', clearInputClassName);

    return () => {
      window.removeEventListener('resize', changeSidebarDisplay);
      window.removeEventListener('resize', clearInputClassName);
    };
  }, [changeSidebarDisplay, clearInputClassName]);

  useEffect(() => {
    setProfile({
      id: me?.user_id,
      name: me?.social_name,
      avatar: me?.avatar,
      type: me?.type,
      username: me?.username,
    });
  }, [me]);

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function searchFunction(username: string) {
    setResultSearch([]);
    setHasResult(false);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    if (username.trim().length < 3) return;
    searchTimeoutRef.current = setTimeout(() => {
      getProfile(username)
        .then(response => {
          setResultSearch(response?.data);
          setHasResult(true);
        })
        .catch(() => {
          setHasResult(false);
        });
    }, 300);
  }

  function handleOpenMenuCompanies(ev) {
    setAnchorCompanyEl(ev.currentTarget);
  }

  function handleCloseMenuCompanies() {
    setAnchorCompanyEl(null);
  }

  function handleOpenMenuProfile(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    profileMenuRef.current?.openProfileMenu(ev);
  }

  function handleOpenModulesMenu(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    modulesMenuRef.current?.openModulesMenu(ev);
  }

  function changeChipContent(index: number) {
    const companyId = collaborators[index].company.id;
    Cookies.remove('companySelected', { domain: domainName });
    Cookies.set('companySelected', companyId, {
      domain: domainName,
    });
    setCompanyId(companyId);
    window.location.reload();
  }

  function openModulesMenu(ev) {
    setAnchorModulesMenuEl(ev.currentTarget);
  }

  function closeModulesMenu() {
    setAnchorModulesMenuEl(null);
  }

  function getUrlStepOne(redirects) {
    const redirecionamentoStepOne = redirects.find(redirect => redirect.type === 1 || redirect.type === 'STEPONE');
    return redirecionamentoStepOne ? redirecionamentoStepOne.url : URL_STEP_ONE;
  }

  function getModuleUrl(moduleItem: ModulesType) {
    if (moduleItem.title !== 'corporative_university') {
      return moduleItem.url;
    }

    if (me?.type === 'COMPANY') {
      return me.redirects && me.redirects.length > 0 ? getUrlStepOne(me.redirects) : URL_STEP_ONE;
    } else if (me?.type === 'PERSON' && me.collaborators && me.collaborators.length > 0) {
      const currentCollaborator = me.collaborators.find(({ company }) => company.id === companyId);
      if (
        currentCollaborator &&
        currentCollaborator.company.redirects &&
        currentCollaborator.company.redirects.length > 0
      ) {
        return getUrlStepOne(currentCollaborator.company.redirects);
      }
    }
    return URL_STEP_ONE;
  }

  function openProfileMenu(ev) {
    setAnchorProfileMenuEl(ev.currentTarget);
  }

  function closeProfileMenu() {
    setAnchorProfileMenuEl(null);
  }

  function getMenuItemUrl() {
    const personUrl = `${links.web.social}/friends`;
    const companyUrl = `${links.web.department}/#/collaborators`;
    return profile?.type === 'PERSON' ? personUrl : profile?.type === 'COMPANY' ? companyUrl : '#';
  }

  useImperativeHandle(profileMenuRef, () => {
    return {
      openProfileMenu,
      closeProfileMenu,
    };
  });

  useImperativeHandle(modulesMenuRef, () => {
    return {
      openModulesMenu,
      closeModulesMenu,
    };
  });

  return (
    <NotificationProvider>
      <HeaderView
        anchorRef={anchorRef}
        hasResult={hasResult}
        collaborators={collaborators}
        userAvatar={me?.avatar}
        accountType={accountType}
        resultSearch={resultSearch}
        searchFunction={searchFunction}
        selectedCollaborator={selectedCollaborator}
        anchorCompaniesEl={anchorCompaniesEl}
        inputBoxClassName={inputBoxClassName}
        changeChipContent={changeChipContent}
        activeManagerMenu={activeManagerMenu}
        setInputBoxClassName={setInputBoxClassName}
        handleOpenMenuProfile={handleOpenMenuProfile}
        handleOpenModulesMenu={handleOpenModulesMenu}
        handleOpenMenuCompanies={handleOpenMenuCompanies}
        handleCloseMenuCompanies={handleCloseMenuCompanies}
        anchorMenuModulesEl={anchorMenuModulesEl}
        closeModulesMenu={closeModulesMenu}
        filteredCollaboratorsModules={filteredCollaboratorsModules}
        filteredUserModules={filteredUserModules}
        getModuleUrl={getModuleUrl}
        closeProfileMenu={closeProfileMenu}
        menuItemUrl={getMenuItemUrl()}
        profile={profile}
        openTutorial={openTutorial}
        setOpenTutorial={setOpenTutorial}
        anchorProfileMenuEl={anchorProfileMenuEl}
        openMenuCompanies={Boolean(anchorCompaniesEl)}
      />
    </NotificationProvider>
  );
};
