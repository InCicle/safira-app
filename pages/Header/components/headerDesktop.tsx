import { IconButton, Avatar, Menu, MenuItem, Stack, Paper, Link, Chip, Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkIcon from '@mui/icons-material/Work';
import { links } from '@/safira-app/config/links';
import Notifications from '@/safira-app/pages/Header/components/Notifications';
import { RenderImage } from '@/safira-app/components/RenderImage';
import { RenderAvatar } from '@/safira-app/components/RenderAvatar';
import { maxLetters } from '@/safira-app/utils/maxLetters';
import RenderSearchItem from '../../../components/RenderSearchItem';
import { translation } from '@/safira-app/utils/translation';
import { FC } from 'react';
import { HeaderDesktopProps } from '../interfaces';

export const HeaderDesktop: FC<HeaderDesktopProps> = ({
  accountType,
  me,
  t,
  user,
  hasResult,
  inputBoxClassName,
  openMenuCompanies,
  companies,
  selectedCompany,
  anchorCompaniesEl,
  resultSearch,
  anchorRef,
  handleOpenMenuCompanies,
  handleCloseMenuCompanies,
  changeChipContent,
  companiesAvatar,
  setInputBoxClassName,
  searchFunction,
  handleOpenModulesMenu,
  handleOpenMenuProfile,
  getLogoUrl,
}) => {
  return (
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
            {!getLogoUrl().isPublicUrl ? (
              <RenderImage
                src={getLogoUrl().logoUrl}
                className="logo"
                alt="logo"
                options={{ ResponseCacheControl: 'max-age=30000' }}
              />
            ) : (
              <img src={getLogoUrl().logoUrl} className="logo" alt="logo" />
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
                  onClick={handleOpenMenuCompanies}
                  size="small"
                  clickable
                  avatar={companiesAvatar()}
                  label={<span style={{ fontSize: '13px' }}>{maxLetters(selectedCompany?.name, 200)}</span>}
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
                onClick={handleCloseMenuCompanies}
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
  );
};
