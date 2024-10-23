import React, {
  cloneElement,
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Box, MenuItem, TextField, TextFieldProps, Typography } from '@mui/material';

export type InputValueType = string | number | readonly string[] | undefined;

export type RenderOptionProps<T> = {
  option: T;
};

export type OnClickAwayArgs = {
  inputValue: InputValueType;
  setInputValue: Dispatch<SetStateAction<InputValueType>>;
};

type AutoCOmpleteProps<T> = {
  searchDelay?: number;
  textFieldProps: TextFieldProps;
  options: T[];
  optionFilter?: (option: { value: InputValueType; option: T }) => boolean;
  onSearch?: (value: string) => void;
  onSelect?: (option: T) => void;
  onClickAway?: (args: OnClickAwayArgs) => void;
  renderOption?: (props: RenderOptionProps<T>) => ReactElement<any, string | JSXElementConstructor<any>>;
  renderNoContent?: () => ReactNode;
};

function Autocomplete<T = any>({
  textFieldProps,
  searchDelay,
  options,
  optionFilter,
  onSearch,
  onSelect,
  onClickAway,
  renderOption,
  renderNoContent,
}: AutoCOmpleteProps<T>) {
  const [showList, setShowList] = useState(false);

  const autocompleteRef = useRef<HTMLDivElement | null>(null);

  const noContent = false;

  const openList = () => setShowList(true);

  const closeList = () => setShowList(false);

  function handleSelectItem(value: any) {
    if (onSelect) {
      onSelect(value);
    }

    closeList();
  }

  return (
    <div ref={autocompleteRef} style={{ position: 'relative' }}>
      <TextField {...textFieldProps} />

      {showList && (
        <Box
          sx={({ spacing }) => ({
            position: 'absolute',
            zIndex: 2,
            top: 48,
            left: 0,
            width: '100%',
            borderRadius: spacing(0.5),
            backgroundColor: '#FFF',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.25)',
            overflow: 'auto',
          })}
        >
          {renderOption &&
            !!options.length &&
            options.map(option => {
              const element = renderOption({ option });
              return cloneElement(element, { onClick: handleSelectItem });
            })}
          {noContent && (
            <MenuItem>
              <Typography>Nada encontrado</Typography>
            </MenuItem>
          )}
        </Box>
      )}
    </div>
  );
}
