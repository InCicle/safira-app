import { ModulesWeb } from "@safira/config/links";
import { MODULE_TYPES } from "@safira/interfaces/Notification";

export type IncicleModules = {
  title: string;
  slug: MODULE_TYPES;
  icon: string;
  linkKey: keyof ModulesWeb | "disabled";
  path?: string;
  userType: "BOTH" | "COMPANY" | "PERSON";
  description: null | {
    COMPANY: string;
    PERSON: string;
  };
};

const incicleModules: IncicleModules[] = [
  {
    title: "Todos",
    slug: MODULE_TYPES.all,
    icon: "https://static-incicle.s3.amazonaws.com/all.svg",
    linkKey: null as any,
    userType: "BOTH",
    description: null,
  },
  {
    title: "Agenda",
    slug: MODULE_TYPES.schedule,
    icon: "https://static-incicle.s3.amazonaws.com/agenda.svg",
    linkKey: "schedule",
    userType: "BOTH",
    description: {
      COMPANY: "Visualize seus comprimissos",
      PERSON: "Visualize seus comprimissos",
    },
  },
  {
    title: "Admissão Digital",
    slug: MODULE_TYPES.personal_department,
    icon: "https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg",
    linkKey: "personal_department",
    userType: "BOTH",
    description: {
      COMPANY: "Receba documentos dos colaboradores",
      PERSON: "Envie documentos para a empresa",
    },
  },
  {
    title: "Departamento Pessoal",
    slug: MODULE_TYPES.organizational_engineering,
    icon: "https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg",
    linkKey: "social",
    path: "/organizational-engineering",
    userType: "COMPANY",
    description: {
      COMPANY: "Cadastre colaboradores, setores, cargos e níveis",
      PERSON: "",
    },
  },
  {
    title: "Endomarketing",
    slug: MODULE_TYPES.endomarketing,
    icon: "https://static-incicle.s3.amazonaws.com/endo-marketing.svg",
    linkKey: "social",
    path: "/endomarketing",
    userType: "COMPANY",
    description: {
      COMPANY: "Acelere a comunicação na sua empresa",
      PERSON: "",
    },
  },
  {
    title: "Feedback",
    slug: MODULE_TYPES.feedback,
    icon: "https://static-incicle.s3.amazonaws.com/feedback.svg",
    linkKey: "social",
    path: "/feedback",
    userType: "BOTH",
    description: {
      COMPANY: "Receba, envie e crie eventos de feedbacks",
      PERSON: "Receba, envie e solicite feedbacks",
    },
  },
  {
    title: "Gestão",
    slug: MODULE_TYPES.project,
    icon: "https://static-incicle.s3.amazonaws.com/projetos.svg",
    linkKey: "project",
    userType: "BOTH",
    description: {
      COMPANY: "Gerencie seus projetos pessoais e profissionais",
      PERSON: "Gerencie seus projetos pessoais e profissionais",
    },
  },
  {
    title: "Gestão por Competência",
    slug: MODULE_TYPES.evaluation360,
    icon: "https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg",
    linkKey: "evaluation",
    userType: "BOTH",
    description: {
      COMPANY: "Avaliações e planos de desenvolvimento",
      PERSON: "Avaliações e planos de desenvolvimento",
    },
  },
  {
    title: "Rede Social",
    slug: MODULE_TYPES.social_network,
    icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
    linkKey: "social",
    userType: "BOTH",
    description: {
      COMPANY: "Acompanhe a rede social e sua produtividade",
      PERSON: "Acompanhe a rede social e sua produtividade",
    },
  },
  // {
  //   title: "Rede Social",
  //   slug: MODULE_TYPES.group,
  //   icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
  //   linkKey: "social",
  //   userType: "BOTH",
  //   description: {
  //     COMPANY: "Acompanhe a rede social e sua produtividade",
  //     PERSON: "Acompanhe a rede social e sua produtividade",
  //   },
  // },
  {
    title: "Recrutamento",
    slug: MODULE_TYPES.recruitment,
    icon: "https://static-incicle.s3.amazonaws.com/recruitment-disabled.svg",
    linkKey: "disabled",
    userType: "BOTH",
    description: {
      COMPANY: "Abra vagas na sua empresa",
      PERSON: "Participe de processos seletivos",
    },
  },
  {
    title: "Ouvidoria",
    slug: MODULE_TYPES.ombudsman,
    icon: "https://static-incicle.s3.amazonaws.com/group-disabled.svg",
    linkKey: "disabled",
    userType: "BOTH",
    description: {
      COMPANY: "Receba avaliações, sugestões e reclamações",
      PERSON: "Envie avaliações, sugestões e reclamações",
    },
  },
  {
    title: "Pesquisa de clima",
    slug: MODULE_TYPES.climate_research,
    icon: "https://static-incicle.s3.amazonaws.com/pesquisa-clima-disabled.svg",
    linkKey: "disabled",
    userType: "COMPANY",
    description: {
      COMPANY: "Crie pesquisas sobre a empresa pessoa",
      PERSON: "",
    },
  },
  {
    title: "Políticas e Procedimentos",
    slug: MODULE_TYPES.policy,
    icon: "https://static-incicle.s3.amazonaws.com/policies.svg",
    linkKey: "policy",
    userType: "BOTH",
    description: {
      COMPANY: "Gerencie as políticas e diretrizes da sua empresa",
      PERSON: "Gerencie as políticas e diretrizes da sua empresa",
    },
  },
  {
    title: "OKR",
    slug: MODULE_TYPES.okr,
    icon: "https://static-incicle.s3.amazonaws.com/okr-icon.svg",
    linkKey: "okr",
    userType: "BOTH",
    description: {
      COMPANY: "Objetivos e Resultados-Chave",
      PERSON: "Objetivos e Resultados-Chave",
    },
  },
];

export default incicleModules;
