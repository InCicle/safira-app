import { FC, useCallback, useEffect, useState } from 'react';
import { TutorialsVideosView } from '../view';
import { getViewedTutorialsData, modifyViewedTutorialsData } from '@/services/api/tutorials/requests';
import { useAuthStore } from '@/store/useAuthStore';
import { COMPANY_LINK, PERSON_LINK } from '@/utils/constants';

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

export const TutorialVideosController: FC<TutorialVideosControllerProps> = ({ open, setOpen }) => {
  const { user } = useAuthStore();
  const [state, setState] = useState(initialState);

  useEffect(() => {
    getViewedTutorialsData().then(response => {
      setState(response.data);
    });
  }, []);

  const modifyViewedData = useCallback(async (moduleName: string) => {
    await modifyViewedTutorialsData(moduleName);
  }, []);

  function getCorrectKey(moduleName: string) {
    const obj = state.filter(element => element.module === moduleName);
    const key = obj[0] ? obj[0].is_view : false;
    return key;
  }

  const handleOpenMoreTutorials = () => {
    if (!user || typeof window === 'undefined') return;
    const { type } = user;

    const urlLink = type === 'COMPANY' ? COMPANY_LINK : PERSON_LINK;

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
