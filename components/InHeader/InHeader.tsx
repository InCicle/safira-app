import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Avatar, Menu, MenuItem, Stack, Paper, Link, Chip, Box, Typography } from '@mui/material';
import { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// icons
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkIcon from '@mui/icons-material/Work';

import RenderAvatar from '@/safira-app/components/RenderAvatar';
import Notifications from '@/safira-app/components/Notifications';
import NotificationProvider from '@/safira-app/contexts/NotificationContext';
import { SearchItemInterface } from '@/safira-app/interfaces/Search';
import { HeaderProvider } from '@/safira-app/contexts/HeaderContext';
import { IUser } from '@/safira-app/interfaces/User';
import { MeProps } from '@/safira-app/interfaces/Me';
import { links } from '@/safira-app/config/links';

import maxLetters from './utils/maxLetters';
import RenderSearchItem from './components/RenderSearchItem';
import ModulesMenu, { ModulesMenuRef } from './components/ModulesMenu';
import ProfileMenu, { ProfileMenuRef } from './components/ProfileMenu';
import { HeaderInStyle } from './styles';
import { ToastUI } from '../Toast';
import { domainName } from '@/safira-app/contexts/AuthContext';
import RenderImage from '../RenderImage';
import { usePermissions } from '../../contexts/PermissionsContext';
import WhatsAppButton from '../WhatsAppButton';
import { translation } from '@/safira-app/utils/translation';

interface props {
  user: IUser;
  me: MeProps;
  api: AxiosInstance;
  signOut: () => any;
}

const INCICLE_LOGO = 'https://static-incicle.s3.amazonaws.com/logo_incicle.svg';

function getLogoFromCompanies(companyId: string, companies: MeProps['companies']) {
  return companies.find(item => item.id === companyId)!?.logo;
}

const InHeader: React.FC<React.PropsWithChildren<props>> = ({ user, me, api, signOut }) => {
  // Array of search result on header
  const [resultSearch, setResultSearch] = useState([] as SearchItemInterface[]);
  const [hasResult, setHasResult] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [accountType, setAccountType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [inputBoxClassName, setInputBoxClassName] = useState('');
  const [activeManagerMenu, setActiveManagerPanel] = useState(false);

  const [anchorCompanysEl, setAnchorCompanysEl] = React.useState(null);
  const openMenuCompanys = Boolean(anchorCompanysEl);

  const modulesMenuRef = useRef<ModulesMenuRef | null>(null);
  const profileMenuRef = useRef<ProfileMenuRef | null>(null);

  const { companyId, checkPermission, permissionsList } = usePermissions();
  const { t } = useTranslation();

  useEffect(() => {
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
  }, [permissionsList]); // eslint-disable-line

  function getLogoUrl() {
    let isPublicUrl = true;
    let logoUrl = '';

    if (me?.type === 'PERSON') {
      const companyLogo = getLogoFromCompanies(selectedCompany?.id, companies);

      logoUrl = companyLogo || INCICLE_LOGO;
      isPublicUrl = !companyLogo;
    } else if (me?.type === 'COMPANY') {
      logoUrl = me?.logo || INCICLE_LOGO;
      isPublicUrl = !me?.logo;
    }

    return { logoUrl, isPublicUrl };
  }

  const { logoUrl, isPublicUrl } = getLogoUrl();

  useEffect(() => {
    const contentSideBarElement = document.querySelector('.contentSidebar > div') as any;
    const handleResize = () => {
      if (contentSideBarElement) {
        if (window.innerWidth < 800) {
          contentSideBarElement!.style.display = 'none';
          return;
        }

        contentSideBarElement!.style.display = 'initial';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
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

  // SEARCH RESULT
  const anchorRef = useRef(null);

  // @ts-ignore-next-line
  function searchFunction(username: string) {
    setResultSearch([]);
    setHasResult(false);
    if (username.trim().length >= 3) {
      api
        .get(`${links.api.social}/profile/name/search?search=${username}`)
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

  // _____ MENU _____

  function handleOpenMenuCompanys(ev: any) {
    setAnchorCompanysEl(ev.currentTarget);
  }

  function handleCloseMenuCompanys() {
    setAnchorCompanysEl(null);
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

  // ____ END ____

  const companiesAvatar = () => {
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

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1200 && inputBoxClassName.length) setInputBoxClassName('');
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // eslint-disable-line

  return (
    <HeaderProvider
      value={{
        user,
        profiles: me,
        api,
        signOut,
      }}
    >
      <NotificationProvider api={api} user={user}>
        <HeaderInStyle role="heading">
          {/* PORTAL */}
          <ToastUI />

          {/* MENU DROPDOWN */}
          <ModulesMenu ref={modulesMenuRef} activeManagerMenu={activeManagerMenu} />

          <ProfileMenu ref={profileMenuRef} />

          {/* COMPONENTS DESKTOP - COMPONENTS MOBILE */}
          {window.innerWidth > 600 ? (
            <>
              <section className="incicleheader-content">
                <nav style={{ alignItems: 'center', display: 'flex' }}>
                  {/* LOGO ICON */}
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
                    {!isPublicUrl ? (
                      <RenderImage
                        src={logoUrl}
                        className="logo"
                        alt="logo"
                        options={{ ResponseCacheControl: 'max-age=30000' }}
                      />
                    ) : (
                      <img src={logoUrl} className="logo" alt="logo" />
                    )}
                  </Link>

                  {/* MODULES links */}
                  <Stack spacing={0} direction="row" className="incicleheader-modules" sx={{ alignItems: 'center' }}>
                    <Stack direction="row" className={`incicleheader-modules-content original`}>
                      {[
                        {
                          text: 'feed',
                          link: links.web?.social,
                        },
                        {
                          text: 'schedule',
                          link: links.web?.schedule,
                        },
                        {
                          text: 'projects',
                          link: links.web?.project,
                        },
                        {
                          text: 'feedback',
                          link: `${links.web?.social}/feedback`,
                        },
                        user.type === 'PERSON'
                          ? {
                              text: 'tasks',
                              link: `${links.web.schedule}/taskmanager`,
                            }
                          : {},
                      ].map((anchor: any) => {
                        if (!anchor?.link) return <></>;

                        return (
                          <Link
                            key={`${anchor.text}`}
                            href={`${anchor.link}`}
                            underline="none"
                            sx={{
                              width: 'max-content',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              p: '6px 8px',
                              color: '#747474',
                              borderRadius: '3px',
                              '&:hover': {
                                background: '#f2f3f5',
                              },
                              '&:active': {
                                fontWeight: 600,
                                color: '#007fa1',
                              },
                              fontSize: '16px',
                            }}
                          >
                            {translation(t, 'modules.'.concat(anchor.text))}
                          </Link>
                        );
                      })}
                    </Stack>
                  </Stack>
                </nav>
              </section>

              <section className="incicleheader-content flex-end">
                <nav>
                  <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* COMPANIES */}
                    <div className="incicleheader-companies">
                      {companies.length > 0 && accountType === 'PERSON' && (
                        <Chip
                          key={1}
                          onClick={handleOpenMenuCompanys}
                          size="small"
                          clickable
                          avatar={companiesAvatar()}
                          label={<span style={{ fontSize: '13px' }}>{maxLetters(selectedCompany?.name, 200)}</span>}
                          onDelete={handleOpenMenuCompanys}
                          deleteIcon={<ArrowDropDownIcon />}
                          variant="outlined"
                          sx={{ padding: '2px !important', height: '32px' }}
                        />
                      )}
                      <Menu
                        key={2}
                        anchorEl={anchorCompanysEl}
                        open={openMenuCompanys}
                        onClose={handleCloseMenuCompanys}
                        onClick={handleCloseMenuCompanys}
                        PaperProps={{
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
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        {companies.map((company, index) => (
                          <MenuItem key={index} component="li" onClick={() => changeChipContent(index)}>
                            <Avatar alt={company.name}>
                              <WorkIcon />
                            </Avatar>
                            <span style={{ padding: '0 !important' }}>{company.name}</span>
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>

                    {/* SEARCH INPUT */}
                    <Paper
                      elevation={0}
                      className="incicleheader-inputbutton"
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton onClick={() => setInputBoxClassName('view')}>
                        <SearchIcon
                          sx={{
                            width: '24px !important',
                            height: '24px !important',
                          }}
                        />
                      </IconButton>
                    </Paper>

                    {/* SEARCH CARD MODAL */}
                    <Paper
                      component="form"
                      className={`incicleheader-inputbox ${inputBoxClassName}`}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        // width: 250,
                        padding: '2px',
                        border: 'none',
                        background: '#f2f3f5',
                        boxShadow: 'none',
                      }}
                      ref={anchorRef}
                    >
                      <Autocomplete
                        options={resultSearch}
                        open={hasResult}
                        noOptionsText={
                          <Typography sx={{ fontSize: '13px !important' }}>Nenhum resultado encontrado</Typography>
                        }
                        sx={{
                          '& input': {
                            background: 'none',
                            border: 'none',
                            outline: 'none',
                          },
                        }}
                        renderInput={params => (
                          <Box
                            ref={params.InputProps.ref}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              marginLeft: '12px',
                              '& input::placeholder': {
                                color: '#ddd !important',
                              },
                            }}
                          >
                            {inputBoxClassName && (
                              <>
                                <IconButton onClick={() => setInputBoxClassName('')}>
                                  <CloseIcon
                                    sx={{
                                      width: '16px !important',
                                      height: '16px !important',
                                    }}
                                  />
                                </IconButton>
                              </>
                            )}
                            <input
                              type="text"
                              {...params.inputProps}
                              className="incicleheader-inputsearch"
                              placeholder={translation(t, 'find_someone')}
                              style={{
                                fontSize: '14px',
                              }}
                            />
                          </Box>
                        )}
                        renderOption={(props, item) => {
                          return <RenderSearchItem liProps={props} item={item} />;
                        }}
                        getOptionLabel={(option: any) => option.name}
                        // @ts-ignore-next-line
                        onInputChange={(e, value: string) => searchFunction(value)}
                        fullWidth
                      />

                      <IconButton type="submit" sx={{ p: '6px' }} aria-label="search">
                        <SearchIcon
                          sx={{
                            width: '24px !important',
                            height: '24px !important',
                            color: '#747474 !important',
                          }}
                        />
                      </IconButton>
                    </Paper>

                    {/* MODULES MENU */}
                    <label className="incicleheader-desktopmodules-label" htmlFor="incicleheader-modules-checkbox">
                      <IconButton onClick={handleOpenModulesMenu}>
                        <AppsIcon
                          sx={{
                            width: '24px !important',
                            height: '24px !important',
                            fill: '#008AC1',
                          }}
                        />
                      </IconButton>
                    </label>

                    {/* NOTIFICATIONS AREA */}
                    <Notifications />

                    {/* AVATAR PROFILE */}
                    <IconButton
                      className="incicleheader-avatar"
                      onClick={handleOpenMenuProfile}
                      size="small"
                      style={{ marginRight: 15 }}
                    >
                      <RenderAvatar sx={{ width: 35, height: 35 }} src={me?.avatar} />
                    </IconButton>
                  </Stack>
                </nav>
              </section>
            </>
          ) : (
            <>
              <section className="incicleheader-content">
                <nav style={{ alignItems: 'center', display: 'flex' }}>
                  {/* MODULES MENU */}
                  <label className="incicleheader-modules-label" htmlFor="incicleheader-modules-checkbox">
                    <IconButton onClick={handleOpenModulesMenu}>
                      <AppsIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                          fill: '#008AC1',
                        }}
                      />
                    </IconButton>
                  </label>

                  {/* SEARCH INPUT */}
                  <Paper
                    elevation={0}
                    className="incicleheader-inputbutton"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton onClick={() => setInputBoxClassName('view')}>
                      <SearchIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                        }}
                      />
                    </IconButton>
                  </Paper>

                  {/* SEARCH CARD MODAL */}
                  <Paper
                    component="form"
                    className={`incicleheader-inputbox ${inputBoxClassName}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      padding: '2px',
                      border: 'none',
                      background: '#f2f3f5',
                      boxShadow: 'none',
                    }}
                    ref={anchorRef}
                  >
                    <Autocomplete
                      options={resultSearch}
                      open={hasResult}
                      noOptionsText={
                        <Typography sx={{ fontSize: '13px !important' }}>
                          {translation(t, 'no_result_found')}
                        </Typography>
                      }
                      sx={{
                        '& input': {
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                        },
                      }}
                      renderInput={params => (
                        <Box
                          ref={params.InputProps.ref}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '12px',
                            '& input::placeholder': {
                              color: '#ddd !important',
                            },
                          }}
                        >
                          {inputBoxClassName && (
                            <>
                              <IconButton onClick={() => setInputBoxClassName('')}>
                                <CloseIcon
                                  sx={{
                                    width: '16px !important',
                                    height: '16px !important',
                                  }}
                                />
                              </IconButton>
                            </>
                          )}
                          <input
                            type="text"
                            {...params.inputProps}
                            className="incicleheader-inputsearch"
                            placeholder={translation(t, 'find_someone')}
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        </Box>
                      )}
                      renderOption={(props, item) => {
                        return <RenderSearchItem liProps={props} item={item} />;
                      }}
                      getOptionLabel={(option: any) => option.name}
                      // @ts-ignore-next-line
                      onInputChange={(e, value: string) => searchFunction(value)}
                      fullWidth
                    />

                    <IconButton type="submit" sx={{ p: '6px' }} aria-label="search">
                      <SearchIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                          color: '#747474 !important',
                        }}
                      />
                    </IconButton>
                  </Paper>
                </nav>
              </section>

              <section className="incicleheader-content center">
                <nav style={{ alignItems: 'center', display: 'flex' }}>
                  {/* LOGO ICON */}
                  <Link
                    href={`${links.web?.social}`}
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      marginRight: '8px',
                      marginLeft: '15px',
                      paddingBottom: '2px',
                      maxWidth: 160,
                      height: 40,
                      overflow: 'hidden',
                      img: {
                        width: 'auto !important',
                        height: '100% !important',
                      },
                    }}
                  >
                    {!isPublicUrl ? (
                      <RenderImage
                        src={logoUrl}
                        className="logo"
                        alt="logo"
                        options={{ ResponseCacheControl: 'max-age=30000' }}
                      />
                    ) : (
                      <img src={logoUrl} className="logo" alt="logo" />
                    )}
                  </Link>
                </nav>
              </section>

              <section className="incicleheader-content flex-end">
                <nav>
                  <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* NOTIFICATIONS AREA */}
                    {/* {
                      <IconButton size="medium" sx={{ width: 35, height: 35 }} onClick={showNotifications}>
                        <Badge color="primary" variant="dot" invisible={badge} badgeContent=" " overlap="circular">
                          <NotificationsIcon sx={{ width: 25, height: 25 }} />
                        </Badge>
                      </IconButton>
                    } */}
                    <Notifications />

                    {/* AVATAR PROFILE */}
                    <IconButton
                      className="incicleheader-avatar"
                      onClick={handleOpenMenuProfile}
                      size="small"
                      style={{ marginRight: 15 }}
                    >
                      <RenderAvatar sx={{ width: 35, height: 35 }} src={me?.avatar} />
                    </IconButton>
                  </Stack>
                </nav>
              </section>
            </>
          )}
        </HeaderInStyle>
      </NotificationProvider>

      <WhatsAppButton />
    </HeaderProvider>
  );
};

export default InHeader;
