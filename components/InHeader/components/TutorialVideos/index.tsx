import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { ModalLayout, Layout } from './styles';
import scheduleImg from '@/safira-app/assets/modules/agenda.svg';
import projectImg from '@/safira-app/assets/modules/projetos.svg';
import socialImg from '@/safira-app/assets/modules/rede_social.svg';
import feedbackImg from '@/safira-app/assets/modules/feedback.svg';
import competenceImg from '@/safira-app/assets/modules/avaliação_por_competencia.svg';
import taskmanagerImg from '@/safira-app/assets/modules/taskmanager.svg';
import pdImg from '@/safira-app/assets/modules/personal_department.svg';
import { useHeaderProvider } from '@/safira-app/contexts/HeaderContext';
import { links } from '@/safira-app/config/links';
import TutorialVideoButton from './components/TutorialVideoButton';
import TutorialDoubleVideoButton from './components/TutorialDoubleVideoButton';
import { useAuth } from '@/safira-app/hooks/useAuth';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState = [
  { module: 'social_network', is_view: false },
  { module: 'schedule', is_view: false },
  { module: 'project', is_view: false },
  { module: '360', is_view: false },
  { module: 'task_manager', is_view: false },
  { module: 'feedback', is_view: false },
  { module: 'dp', is_view: false },
];

const Tutorials: React.FC<Props> = ({ open, setOpen }) => {
  const { user } = useAuth();
  const [state, setState] = useState(initialState);
  const { api } = useHeaderProvider();

  async function getViewedData() {
    await api.get(`${links.api.core}/tutorials`).then(res => {
      setState(res.data);
    });
  }

  async function modifyViewedData(moduleName: string) {
    await api.put(`${links.api.core}/tutorials/${moduleName}/viewed`);
    await getViewedData();
  }

  useEffect(() => {
    getViewedData();
  }, []);

  function getCorrectKey(moduleName: string) {
    const obj = state.filter(element => element.module === moduleName);
    const key = obj[0] ? obj[0].is_view : false;
    return key;
  }

  const handleOpenMoreTutorials = () => {
    const { type } = user;
    const personLink = 'https://www.incicle.com/tutoriais-de-suporte-person/';
    const companyLink = 'https://www.incicle.com/tutoriais-de-suporte-company/';

    const urlLink = type === 'COMPANY' ? companyLink : personLink;

    window.open(urlLink, '_blank');
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalLayout className="withCustomScrollbar">
        <Box className="modalLayoutWrapper">
          <Layout>
            <Typography color="textPrimary" className="step7Title">
              Veja aqui, outros de nossos tutoriais e aproveite nossa ferramenta com o máximo que ela tem para te
              oferecer.
            </Typography>
            <Grid
              container
              spacing={1}
              maxWidth={600}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'stretch'}
              sx={{ overflowY: 'auto', maxHeight: 'calc(80vh - 50px)', paddingBottom: '36px', marginTop: '0' }}
            >
              <Grid item xs={12} sm={6}>
                <TutorialDoubleVideoButton
                  name={'Tela principal'}
                  moduleImg={socialImg}
                  description={
                    'Unindo todos os nossos módulos, aqui você gerencia todas as suas informações e acompanha tudo o que está acontecendo em sua rotina.'
                  }
                  markAsViewed={modifyViewedData}
                  videos={[
                    'https://player.vimeo.com/video/754907110?h=9e8690e9f1',
                    'https://player.vimeo.com/video/754903337?h=3a7ca574dc',
                  ]}
                  doubleOptions={['Perfil', 'Feed']}
                  doubleIsViewed={[getCorrectKey('profile'), getCorrectKey('social_network')]}
                  doubleKeys={['profile', 'social_network']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialVideoButton
                  name={'Agenda'}
                  moduleImg={scheduleImg}
                  description={
                    'Marque seus compromissos, compartilhe agendas, com todos os recursos que você já conhece, além de muitas facilidades.'
                  }
                  videoUrl={'https://player.vimeo.com/video/757209248?h=27576ffbec'}
                  isViewed={getCorrectKey('schedule')}
                  markAsViewed={() => modifyViewedData('schedule')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialVideoButton
                  name={'Gestão'}
                  moduleImg={projectImg}
                  description={
                    'Gestão completa, para planejamentos, rotinas, reuniões e projetos, acompanhe e visualize através de diferentes metodologias, Kanbam, Gant, 5W2H, e calendário, visualize dashboards e painéis de eficiência que facilitarão seu acompanhamento.'
                  }
                  videoUrl={'https://player.vimeo.com/video/754923499?h=7b12561ae5'}
                  isViewed={getCorrectKey('project')}
                  markAsViewed={() => modifyViewedData('project')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialDoubleVideoButton
                  name={'Gestão por competência'}
                  moduleImg={competenceImg}
                  description={
                    'Participe de pesquisas de desempenho e competências, entenda como você está se desenvolvendo em diferentes critérios e crie planos de desenvolvimento individual (depende de criação pela empresa).'
                  }
                  markAsViewed={modifyViewedData}
                  videos={[
                    'https://player.vimeo.com/video/757210870?h=3d85c4e8af',
                    'https://player.vimeo.com/video/757212025?h=be379d11d4',
                  ]}
                  doubleOptions={['Avaliações', 'PDI']}
                  doubleIsViewed={[getCorrectKey('360'), getCorrectKey('pdi')]}
                  doubleKeys={['360', 'pdi']}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialVideoButton
                  name={'Departamento pessoal'}
                  moduleImg={pdImg}
                  description={'Envie e receba documentos da empresa que está sendo contratado.'}
                  videoUrl={'https://player.vimeo.com/video/754927213?h=d0187efb4b'}
                  isViewed={getCorrectKey('dp')}
                  markAsViewed={() => modifyViewedData('dp')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialVideoButton
                  name={'Feedback'}
                  moduleImg={feedbackImg}
                  description={
                    'Receba e envie feedbacks de forma simples e rápida. Você ainda pode compartilhar seus feedbacks como postagens em nossa Rede Social.'
                  }
                  videoUrl={'https://player.vimeo.com/video/754926426?h=f5581121bc'}
                  isViewed={getCorrectKey('feedback')}
                  markAsViewed={() => modifyViewedData('feedback')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TutorialVideoButton
                  name={'Gerenciador de tarefas'}
                  moduleImg={taskmanagerImg}
                  description={
                    'Lincado com nosso painel de eficiência, aqui você organiza suas tarefas de diversas maneiras, além de poder delegá-las e acompanhá-las de forma simples e rápida.'
                  }
                  videoUrl={'https://player.vimeo.com/video/754921160?h=9dbb323fc5'}
                  isViewed={getCorrectKey('task_manager')}
                  markAsViewed={() => modifyViewedData('task_manager')}
                />
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
            </Grid>
            <Box>
              <Grid
                container
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'white',
                  padding: '4px 16px',
                  borderTop: '1px solid #e0e0e0',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              >
                <Grid item xs={12} sm={12} lg={12} className="finalButton" sx={{ gap: '8px', justifyContent: 'end' }}>
                  <Button variant="outlined" onClick={() => setOpen(false)}>
                    Fechar
                  </Button>
                  <Button variant="contained" onClick={handleOpenMoreTutorials}>
                    Ver mais
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Layout>
        </Box>
      </ModalLayout>
    </Modal>
  );
};

export default Tutorials;
