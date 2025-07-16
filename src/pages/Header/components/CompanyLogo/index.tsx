import React from 'react';
import Cookies from 'js-cookie';
import { useProfile } from '@/hooks/useProfile';
import RenderImage from '../RenderImage';
import { INCICLE_LOGO } from '@/utils/constants';

interface CompanyLogoProps {
  height?: number;
  margin?: string | number;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({
  height = 35,
  margin = 0,
}) => {
  const { me } = useProfile();

  if (!me) return null;

  let logoUrl = INCICLE_LOGO;
  let isPublic = true;

  if (me.type === 'COMPANY' && me.logo) {
    logoUrl = me.logo;
    isPublic = false;
  }

  if (me.type === 'PERSON' && me.collaborators?.length) {
    const selectedCompanyId =
      Cookies.get('companySelected') || me.collaborators[0].company.id;
    const selected = me.collaborators.find(
      (col) => col.company.id === selectedCompanyId,
    );
    if (selected?.company.logo) {
      logoUrl = selected.company.logo;
      isPublic = false;
    }
  }

  return isPublic ? (
    <img
      src={logoUrl}
      alt="Logo"
      style={{
        height,
        margin,
        width: '100%',
        objectFit: 'contain',
      }}
    />
  ) : (
    <RenderImage
      src={logoUrl}
      bucket="incicle"
      alt="Logo"
      style={{
        height,
        margin,
        width: '100%',
        objectFit: 'contain',
      }}
      options={{ ResponseCacheControl: 'max-age=30000' }}
    />
  );
};

export default CompanyLogo;
