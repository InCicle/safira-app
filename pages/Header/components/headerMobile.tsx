import { HeaderMobileProps } from '../interfaces';
import { IconButton, Stack, Paper, Link, Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { links } from '@/safira-app/config/links';
import Notifications from '@/safira-app/pages/Header/components/Notifications';
import { RenderImage } from '@/safira-app/components/RenderImage';
import { RenderAvatar } from '@/safira-app/components/RenderAvatar';
import RenderSearchItem from '../../../components/RenderSearchItem';
import { translation } from '@/safira-app/utils/translation';
import { FC } from 'react';

export const HeaderMobile: FC<HeaderMobileProps> = ({
  me,
  t,
  hasResult,
  inputBoxClassName,
  anchorRef,
  resultSearch,
  handleOpenModulesMenu,
  setInputBoxClassName,
  searchFunction,
  handleOpenMenuProfile,
  getLogoUrl,
}) => {
  return (
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
                <Typography sx={{ fontSize: '13px !important' }}>{translation(t, 'no_result_found')}</Typography>
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
        </nav>
      </section>

      <section className="incicleheader-content flex-end">
        <nav>
          <Stack spacing={1} direction="row" sx={{ justifyContent: 'flex-end', alignItems: 'center' }}>
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
