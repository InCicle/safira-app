import React from 'react';
import Cookies from 'js-cookie';
import { useProfileContext } from '@/contexts/ProfileContext';
import RenderImage from '@/safira-app/components/RenderImage';

interface CompanyLogoProps {
  height?: number;
  margin?: string | number;
}

const INCICLE_LOGO = 'https://static-incicle.s3.amazonaws.com/logo_incicle.svg';

const CompanyLogo: React.FC<CompanyLogoProps> = ({ height = 35, margin = 0 }) => {
  const { me } = useProfileContext();

  if (!me) return null;

  let logoUrl = INCICLE_LOGO;
  let isPublic = true;

  if (me.type === 'COMPANY' && me.logo) {
    logoUrl = me.logo;
    isPublic = false;
  }

  if (me.type === 'PERSON' && me.collaborators?.length) {
    const selectedCompanyId = Cookies.get('companySelected') || me.collaborators[0].company.id;
    const selected = me.collaborators.find(col => col.company.id === selectedCompanyId);
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
          width: 'auto',
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
          width: 'auto',
          objectFit: 'contain',
        }}
        options={{ ResponseCacheControl: 'max-age=30000' }}
      />
  );
};

export default CompanyLogo;
