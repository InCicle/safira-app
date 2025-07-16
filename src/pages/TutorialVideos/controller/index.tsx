import { FC, useCallback, useEffect, useState } from 'react';
import { TutorialsVideosView } from '../view';
import {
  getViewedTutorialsData,
  modifyViewedTutorialsData,
} from '@/services/api/tutorials/requests';
import { useAuth } from '@/hooks/useAuth';

const initialState = [
  { module: 'social_network', is_view: false },
  { module: 'schedule', is_view: false },
  { module: 'project', is_view: false },
  { module: '360', is_view: false },
  { module: 'task_manager', is_view: false },
  { module: 'feedback', is_view: false },
  { module: 'dp', is_view: false },
];

interface TutorialVideosControllerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TutorialVideosController: FC<TutorialVideosControllerProps> = ({
  open,
  setOpen,
}) => {
  const { user } = useAuth();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getViewedTutorialsData().then((response) => {
      setState(response.data);
    });
  }, []);

  const modifyViewedData = useCallback(async (moduleName: string) => {
    await modifyViewedTutorialsData(moduleName);
  }, []);

  function getCorrectKey(moduleName: string) {
    const obj = state.filter((element) => element.module === moduleName);
    const key = obj[0] ? obj[0].is_view : false;
    return key;
  }

  const handleOpenMoreTutorials = () => {
    if (!user || typeof window === 'undefined') return;
    const { type } = user;
    const personLink = 'https://www.incicle.com/tutoriais-de-suporte-person/';
    const companyLink = 'https://www.incicle.com/tutoriais-de-suporte-company/';

    const urlLink = type === 'COMPANY' ? companyLink : personLink;

    window.open(urlLink, '_blank');
  };

  return (
    <TutorialsVideosView
      open={open}
      setOpen={setOpen}
      getCorrectKey={getCorrectKey}
      modifyViewedData={modifyViewedData}
      handleOpenMoreTutorials={handleOpenMoreTutorials}
    />
  );
};
