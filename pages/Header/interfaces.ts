import { MeProps } from '@/safira-app/interfaces/Me';
import { IUser } from '@/safira-app/interfaces/User';
import { TFunction } from 'i18next';
import { RefObject } from 'react';
import { JSX } from 'react/jsx-runtime';

export interface HeaderDesktopProps {
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
  anchorRef: RefObject<HTMLFormElement | null>;
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

export interface HeaderMobileProps {
  me: MeProps;
  t: TFunction<'translation', undefined>;
  hasResult: boolean;
  inputBoxClassName: string;
  resultSearch: Array<any>;
  anchorRef: RefObject<HTMLFormElement | null>;
  setInputBoxClassName: (className: string) => void;
  searchFunction: (value: string) => void;
  handleOpenModulesMenu: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOpenMenuProfile: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  getLogoUrl: () => {
    logoUrl: string;
    isPublicUrl: boolean;
  };
}
