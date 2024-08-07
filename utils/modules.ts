import { links, ModulesWeb } from 'safira-app/config/links';
import { MeProps } from 'safira-app/interfaces/Me';
import { MODULE_TYPES } from 'safira-app/interfaces/Notification';

import TaskManagerIcon from 'safira-app/assets/modules/task_manager.svg';

export type MenuModulesType = {
  title: string;
  icon: string;
  iconSize: number;
  url: string | null;
  slug: string;
  accountTypes: MeProps['type'][];
  description: {
    [K in MeProps['type']]: string | null;
  };
  permission?: string;
  enableOnlyTo?: string[];
};

export const incicleMenuModules: MenuModulesType[] = [
  {
    title: 'Agenda',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/agenda.svg',
    iconSize: 60,
    url: links.web.schedule,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Visualize seus compromissos.',
      PERSON: 'Visualize seus compromissos.',
    },
  },
  {
    title: 'Admissão Digital',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg',
    iconSize: 60,
    url: links.web.personal_department,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Receba documentos dos colaboradores.',
      PERSON: 'Envie documentos para a empresa.',
    },
  },
  {
    title: 'Departamento Pessoal',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg',
    iconSize: 60,
    url: links.web.department,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'Cadastre colaboradores, setores, cargos e níveis.',
      PERSON: 'Cadastre colaboradores, setores, cargos e níveis.',
    },
  },
  {
    title: 'Endomarketing',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/endo-marketing.svg',
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'Acelere a comunicação na sua empresa.',
      PERSON: null,
    },
  },
  {
    title: 'Feedback',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/feedback.svg',
    iconSize: 60,
    url: `${links.web.social}/feedback`,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Receba, envie e crie eventos de feedbacks.',
      PERSON: 'Receba, envie e solicite feedbacks.',
    },
  },
  {
    title: 'Gestão',
    slug: MODULE_TYPES.project,
    icon: 'https://static-incicle.s3.amazonaws.com/projetos.svg',
    iconSize: 60,
    url: links.web.project,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Gerencie seus projetos pessoais e profissionais.',
      PERSON: 'Gerencie seus projetos pessoais e profissionais.',
    },
  },
  {
    title: 'Gestão por competência',
    slug: MODULE_TYPES.evaluation360,
    icon: 'https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg',
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'Avaliações e planos de desenvolvimento.',
      PERSON: null,
    },
  },
  {
    title: 'Gestão por competência',
    slug: MODULE_TYPES.evaluation360,
    icon: 'https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg',
    iconSize: 60,
    url: links.web.evaluation + '/user_view',
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'Avaliações e planos de desenvolvimento.',
    },
  },
  {
    title: 'Rede Social',
    slug: MODULE_TYPES.social_network,
    icon: 'https://static-incicle.s3.amazonaws.com/rede-social.svg',
    iconSize: 60,
    url: links.web.social,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Acompanhe a rede social e sua produtividade.',
      PERSON: 'Acompanhe a rede social e sua produtividade.',
    },
  },
  {
    title: 'Políticas e Procedimentos',
    slug: MODULE_TYPES.climate_research,
    icon: 'https://static-incicle.s3.amazonaws.com/policies.svg',
    iconSize: 51,
    accountTypes: ['COMPANY'],
    url: links.web.policy,
    description: {
      COMPANY: 'Gerencie as políticas da sua empresa e compartilhe com seus colaboradores.',
      PERSON: null,
    },
  },
  {
    title: 'OKR',
    slug: '',
    icon: 'https://static-incicle.s3.amazonaws.com/okr-icon.svg',
    iconSize: 65,
    accountTypes: ['COMPANY', 'PERSON'],
    url: links.web.okr,
    description: {
      COMPANY: 'Objetivos e Resultados-Chave.',
      PERSON: 'Objetivos e Resultados-Chave.',
    },
  },
  {
    title: 'Tarefas',
    slug: MODULE_TYPES.task_manager,
    icon: TaskManagerIcon,
    iconSize: 46,
    url: `${links.web.schedule}/taskmanager`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'Gerencie suas tarefas e acompanhe seu desempenho geral.',
    },
  },
  {
    title: 'InCheck',
    slug: MODULE_TYPES.in_check,
    icon: 'https://static-incicle.s3.amazonaws.com/InCheck.svg',
    iconSize: 60,
    url: links.web.incheck,
    accountTypes: ['PERSON', 'COMPANY'],
    description: {
      COMPANY: 'Crie checklist, planos de ações e relatórios.',
      PERSON: 'Respoda checklists, crie ações e relatórios.',
    },
    enableOnlyTo: ['4d7a2110-45c5-465d-bccf-806413fc1034', 'd4164ad8-7ff7-4bfa-81d1-3498b8ba1a48'],
  },
  {
    title: 'Configurações do sistema',
    slug: MODULE_TYPES.task_manager,
    icon: 'https://static-incicle.s3.amazonaws.com/settings.svg',
    iconSize: 46,
    url: `${links.web.settings}`,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'Gerencie permissões e outras preferências.',
      PERSON: 'Gerencie as preferências da sua conta.',
    },
  },
  {
    title: 'InPonto',
    slug: MODULE_TYPES.in_point,
    icon: 'https://static-incicle.s3.amazonaws.com/inPonto.svg',
    iconSize: 46,
    url: 'https://inponto.incicle.com/',
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Controle onde e como você quiser.',
      PERSON: 'Controle onde e como você quiser.',
    },
  },
  {
    title: 'Ouvidoria',
    slug: MODULE_TYPES.ombudsman,
    icon: 'https://static-incicle.s3.amazonaws.com/group-disabled.svg',
    iconSize: 53,
    url: null,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'Receba avaliações, sugestões e reclamações.',
      PERSON: 'Envie avaliações, sugestões e reclamações.',
    },
  },
  {
    title: 'Pesquisa de clima',
    slug: MODULE_TYPES.climate_research,
    icon: 'https://static-incicle.s3.amazonaws.com/pesquisa-clima-disabled.svg',
    iconSize: 51,
    accountTypes: ['COMPANY'],
    url: null,
    description: {
      COMPANY: 'Crie pesquisas sobre a empresa pessoa.',
      PERSON: null,
    },
  },
];

export const incicleCollaboratorsMenuModules: MenuModulesType[] = [
  {
    title: 'Departamento Pessoal',
    slug: MODULE_TYPES.all,
    icon: 'https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg',
    iconSize: 60,
    url: links.web.department,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'Cadastre colaboradores, setores, cargos e níveis.',
      PERSON: 'Cadastre colaboradores, setores, cargos e níveis.',
    },
    permission: 'general_dashboard',
  },
  {
    title: 'Endomarketing',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/endo-marketing.svg',
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'Acelere a comunicação na sua empresa.',
    },
    permission: 'full_endomarketing',
  },
  {
    title: 'Admissão Digital',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg',
    iconSize: 60,
    url: `${links.web.personal_department}/dashboard`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'Gerencie as contratações da empresa que você tem vínculo.',
    },
    permission: 'full_personal_department',
  },
  {
    title: 'Gestão por competência',
    slug: MODULE_TYPES.evaluation360,
    icon: 'https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg',
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'Avaliações e planos de desenvolvimento.',
      PERSON: 'Avaliações e planos de desenvolvimento.',
    },
    permission: 'full_competency_management',
  },
  {
    title: 'InCheck',
    slug: MODULE_TYPES.in_check,
    icon: 'https://static-incicle.s3.amazonaws.com/InCheck.svg',
    iconSize: 60,
    url: `${links.web.incheck}/dashboard`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'Avaliações e planos de desenvolvimento.',
      PERSON: 'Avaliações e planos de desenvolvimento.',
    },
    permission: 'in_check',
  },
];

export const incicleManagerMenuModules: MenuModulesType = {
  title: 'Painel do Gestor',
  slug: MODULE_TYPES.all,
  icon: 'https://static-incicle.s3.amazonaws.com/manager-icon.svg',
  iconSize: 50,
  url: links.web.manager,
  accountTypes: ['PERSON'],
  description: {
    COMPANY: null,
    PERSON: 'Gerencie informações e ações da sua equipe.',
  },
};

export type FilterModulesType = {
  title: string;
  slug: MODULE_TYPES;
  icon: string;
  linkKey: keyof ModulesWeb | 'disabled';
  userType: 'BOTH' | 'COMPANY' | 'PERSON';
};

export const incicleNotificationModules: FilterModulesType[] = [
  {
    title: 'Todos',
    slug: MODULE_TYPES.all,
    icon: 'https://static-incicle.s3.amazonaws.com/all.svg',
    linkKey: null as any,
    userType: 'BOTH',
  },
  {
    title: 'Agenda',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/agenda.svg',
    linkKey: 'schedule',
    userType: 'BOTH',
  },
  {
    title: 'Admissão Digital',
    slug: MODULE_TYPES.personal_department,
    icon: 'https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg',
    linkKey: 'personal_department',
    userType: 'BOTH',
  },
  {
    title: 'Departamento Pessoal',
    slug: MODULE_TYPES.organizational_engineering,
    icon: 'https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg',
    linkKey: 'social',
    userType: 'COMPANY',
  },
  {
    title: 'Endomarketing',
    slug: MODULE_TYPES.endomarketing,
    icon: 'https://static-incicle.s3.amazonaws.com/endo-marketing.svg',
    linkKey: 'social',
    userType: 'COMPANY',
  },
  {
    title: 'Feedback',
    slug: MODULE_TYPES.feedback,
    icon: 'https://static-incicle.s3.amazonaws.com/feedback.svg',
    linkKey: 'social',
    userType: 'BOTH',
  },
  {
    title: 'Gestão',
    slug: MODULE_TYPES.project,
    icon: 'https://static-incicle.s3.amazonaws.com/projetos.svg',
    linkKey: 'project',
    userType: 'BOTH',
  },
  {
    title: 'Gestão por Competência',
    slug: MODULE_TYPES.evaluation360,
    icon: 'https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg',
    linkKey: 'evaluation',
    userType: 'BOTH',
  },
  {
    title: 'Rede Social',
    slug: MODULE_TYPES.social_network,
    icon: 'https://static-incicle.s3.amazonaws.com/rede-social.svg',
    linkKey: 'social',
    userType: 'BOTH',
  },
  // {
  //   title: "Rede Social",
  //   slug: MODULE_TYPES.group,
  //   icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
  //   linkKey: "social",
  //   userType: "BOTH",
  // },
  {
    title: 'Recrutamento',
    slug: MODULE_TYPES.recruitment,
    icon: 'https://static-incicle.s3.amazonaws.com/recruitment-disabled.svg',
    linkKey: 'disabled',
    userType: 'BOTH',
  },
  {
    title: 'Ouvidoria',
    slug: MODULE_TYPES.ombudsman,
    icon: 'https://static-incicle.s3.amazonaws.com/group-disabled.svg',
    linkKey: 'disabled',
    userType: 'BOTH',
  },
  {
    title: 'Pesquisa de clima',
    slug: MODULE_TYPES.climate_research,
    icon: 'https://static-incicle.s3.amazonaws.com/pesquisa-clima-disabled.svg',
    linkKey: 'disabled',
    userType: 'COMPANY',
  },
  {
    title: 'Políticas e Procedimentos',
    slug: MODULE_TYPES.policy,
    icon: 'https://static-incicle.s3.amazonaws.com/policies.svg',
    linkKey: 'policy',
    userType: 'BOTH',
  },
  {
    title: 'OKR',
    slug: MODULE_TYPES.okr,
    icon: 'https://static-incicle.s3.amazonaws.com/okr-icon.svg',
    linkKey: 'okr',
    userType: 'BOTH',
  },
];
