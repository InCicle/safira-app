import RenderSearchItem from '@/components/RenderSearchItem';
import { translation } from '@/utils/translation';
import { Autocomplete, Box, IconButton, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface SearchCardModalProps {
  hasResult: boolean;
  inputBoxClassName: string;
  anchorRef: React.RefObject<HTMLFormElement | null>;
  resultSearch: any[];
  searchFunction: (value: string) => void;
  setInputBoxClassName: (value: string) => void;
}

export const SearchInput: FC<SearchCardModalProps> = ({
  anchorRef,
  hasResult,
  inputBoxClassName,
  resultSearch,
  searchFunction,
  setInputBoxClassName,
}) => {
  const { t } = useTranslation();
  return (
    <div>
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
        ref={anchorRef as React.RefObject<HTMLFormElement>}
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
                <div>
                  <IconButton onClick={() => setInputBoxClassName('')}>
                    <CloseIcon
                      sx={{
                        width: '16px !important',
                        height: '16px !important',
                      }}
                    />
                  </IconButton>
                </div>
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
          onInputChange={(_, value: string) => searchFunction(value)}
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
    </div>
  );
};
