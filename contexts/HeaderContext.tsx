import React, { createContext, useEffect, useState } from 'react';

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface HeaderProviderProps {
  companySelected?: string;
}

export interface HeaderContextProps extends HeaderProviderProps {
  setCompanySelected: SetState<string>;
}

export interface Props {
  value: HeaderProviderProps;
}

const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps);

const HeaderProvider: React.FC<React.PropsWithChildren<Props>> = ({ children, value }) => {
  const [companySelected, setCompanySelected] = useState(value.companySelected);

  useEffect(() => {
    if (value.companySelected) setCompanySelected(value.companySelected);
  }, [value]);

  const context = {
    companySelected,
    setCompanySelected,
  } as HeaderContextProps;

  return <HeaderContext.Provider value={context}>{children}</HeaderContext.Provider>;
};

export { HeaderContext, HeaderProvider };
