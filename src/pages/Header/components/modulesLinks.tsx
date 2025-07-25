import { links } from '@/utils/links';
import { translation } from '@/utils/translation';
import { Link, Stack } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const modulesLinksList = (accountType: string) => {
  const defaultLinks = [
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
      link: links.web?.feedback,
    },
  ];

  if (accountType === 'PERSON')
    defaultLinks.push({
      text: 'tasks',
      link: links.web.task_manager,
    });

  return defaultLinks;
};

interface ModulesLinksProps {
  accountType: string;
}

export const ModulesLinks: FC<ModulesLinksProps> = ({ accountType }) => {
  const { t } = useTranslation();
  return (
    <Stack
      spacing={0}
      direction="row"
      className="incicleheader-modules"
      sx={{ alignItems: 'center' }}
    >
      <Stack
        direction="row"
        className={`incicleheader-modules-content original`}
      >
        {modulesLinksList(accountType).map((anchor) => {
          return (
            <Link
              key={anchor.text}
              href={anchor.link}
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
  );
};
