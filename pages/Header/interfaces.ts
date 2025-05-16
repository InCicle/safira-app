import { RefObject } from 'react';
import { JSX } from 'react/jsx-runtime';

export interface HeaderDesktopProps {
  userAvatar: string;
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

  logoUrl: string;
  isPublicUrl: boolean;
}

export interface HeaderMobileProps {
  userAvatar: string;
  hasResult: boolean;
  inputBoxClassName: string;
  resultSearch: Array<any>;
  anchorRef: RefObject<HTMLFormElement | null>;
  setInputBoxClassName: (className: string) => void;
  searchFunction: (value: string) => void;
  handleOpenModulesMenu: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOpenMenuProfile: (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  logoUrl: string;
  isPublicUrl: boolean;
}
