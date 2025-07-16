import { CollaboratorsInterface } from '@/interfaces/Me';
import { RefObject } from 'react';

export interface HeaderMobileProps {
  userAvatar: string;
  hasResult: boolean;
  inputBoxClassName: string;
  resultSearch: Array<any>;
  anchorRef: RefObject<HTMLFormElement | null>;
  setInputBoxClassName: (className: string) => void;
  searchFunction: (value: string) => void;
  handleOpenModulesMenu: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  handleOpenMenuProfile: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}

export interface HeaderDesktopProps extends HeaderMobileProps {
  accountType: string;
  openMenuCompanies: boolean;
  collaborators: CollaboratorsInterface[];
  selectedCollaborator?: CollaboratorsInterface;
  anchorCompaniesEl: HTMLElement | null;
  handleOpenMenuCompanies: (ev: any) => void;
  handleCloseMenuCompanies: () => void;
  changeChipContent: (index: number) => void;
}
