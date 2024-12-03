import { links, ModulesWeb } from "safira-app/config/links";
import { MeProps } from "safira-app/interfaces/Me";
import { MODULE_TYPES } from "safira-app/interfaces/Notification";

import SteponeIcon from "safira-app/components/InHeader/components/icons/SteponeIcon";
import ScheduleIcon from "safira-app/components/InHeader/components/icons/ScheduleIcon";
import AdmissionIcon from "safira-app/components/InHeader/components/icons/AdmissionIcon";
import PersonalDepartmentIcon from "safira-app/components/InHeader/components/icons/PersonalDepartmentIcon";
import EndoMarketingIcon from "safira-app/components/InHeader/components/icons/EndoMarketingIcon";
import FeedbackIcon from "safira-app/components/InHeader/components/icons/FeedbackIcon";
import ProjectManagementIcon from "safira-app/components/InHeader/components/icons/ProjectManagementIcon";
import CompetencyIcon from "safira-app/components/InHeader/components/icons/CompetencyIcon";
import SocialNetworkIcon from "safira-app/components/InHeader/components/icons/SocialNetworkIcon";
import PolicyIcon from "safira-app/components/InHeader/components/icons/PolicyIcon";
import OkrIcon from "safira-app/components/InHeader/components/icons/OkrIcon";
import TaskIcon from "safira-app/components/InHeader/components/icons/TaskIcon";
import InCheckIcon from "safira-app/components/InHeader/components/icons/InCheckIcon";
import SettingsIcon from "safira-app/components/InHeader/components/icons/SettingsIcon";
import InpontoIcon from "safira-app/components/InHeader/components/icons/InpontoIcon";
import ManagerIcon from "safira-app/components/InHeader/components/icons/ManagerIcon";
import ClimateResearchDisabledIcon from "safira-app/components/InHeader/components/icons/ClimateResearchDisabledIcon";
import OmbudsmanIcon from 'safira-app/components/InHeader/components/icons/OmbudsmanIcon';
import HRConnectIcon from "safira-app/components/InHeader/components/icons/HRConnectIcon";

export type MenuModulesType = {
  title: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize: number;
  url: string | null;
  slug: string;
  accountTypes: MeProps["type"][];
  description: {
    [K in MeProps["type"]]: string | null;
  };
  permission?: string;
  enableOnlyTo?: string[];
  redirectType: "internal" | "external";
};

export const incicleMenuModules: MenuModulesType[] = [
  {
    title: "schedule",
    slug: MODULE_TYPES.schedule,
    icon: ScheduleIcon,
    iconSize: 60,
    url: links.web.schedule,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "schedule_description",
      PERSON: "schedule_description",
    },
    redirectType: "internal",
  },
  {
    title: "admission",
    slug: MODULE_TYPES.schedule,
    icon: AdmissionIcon,
    iconSize: 60,
    url: links.web.personal_department,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "admission_description.company",
      PERSON: "admission_description.person",
    },
    redirectType: "internal",
  },
  {
    title: "personal_department",
    slug: MODULE_TYPES.schedule,
    icon: PersonalDepartmentIcon,
    iconSize: 60,
    url: links.web.department,
    accountTypes: ["COMPANY"],
    description: {
      COMPANY: "personal_department_description",
      PERSON: "personal_department_description",
    },
    redirectType: "internal",
  },
  {
    title: "endomarketing",
    slug: MODULE_TYPES.schedule,
    icon: EndoMarketingIcon,
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ["COMPANY"],
    description: {
      COMPANY: "endomarketing_description",
      PERSON: null,
    },
    redirectType: "internal",
  },
  {
    title: "feedback",
    slug: MODULE_TYPES.schedule,
    icon: FeedbackIcon,
    iconSize: 60,
    url: `${links.web.social}/feedback`,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "feedback_description.company",
      PERSON: "feedback_description.person",
    },
    redirectType: "internal",
  },
  {
    title: "projects",
    slug: MODULE_TYPES.project,
    icon: ProjectManagementIcon,
    iconSize: 60,
    url: links.web.project,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "projects_description",
      PERSON: "projects_description",
    },
    redirectType: "internal",
  },
  {
    title: "evaluation",
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ["COMPANY"],
    description: {
      COMPANY: "evaluation_description",
      PERSON: null,
    },
    redirectType: "internal",
  },
  {
    title: "evaluation",
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation + "/user_view",
    accountTypes: ["PERSON"],
    description: {
      COMPANY: null,
      PERSON: "evaluation_description",
    },
    redirectType: "internal",
  },
  {
    title: "social_network",
    slug: MODULE_TYPES.social_network,
    icon: SocialNetworkIcon,
    iconSize: 60,
    url: links.web.social,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "social_network_description",
      PERSON: "social_network_description",
    },
    redirectType: "internal",
  },
  {
    title: "policies_and_procedures",
    slug: MODULE_TYPES.policy,
    icon: PolicyIcon,
    iconSize: 60,
    accountTypes: ["COMPANY"],
    url: links.web.policy,
    description: {
      COMPANY: "policies_and_procedures_description",
      PERSON: null,
    },
    redirectType: "internal",
  },
  {
    title: "okr",
    slug: "",
    icon: OkrIcon,
    iconSize: 60,
    accountTypes: ["COMPANY", "PERSON"],
    url: links.web.okr,
    description: {
      COMPANY: "okr_description",
      PERSON: "okr_description",
    },
    redirectType: "internal",
  },
  {
    title: "tasks",
    slug: MODULE_TYPES.task_manager,
    icon: TaskIcon,
    iconSize: 60,
    url: `${links.web.schedule}/taskmanager`,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: null,
      PERSON: "tasks_description",
    },
    redirectType: "internal",
  },
  {
    title: "in_check",
    slug: MODULE_TYPES.in_check,
    icon: InCheckIcon,
    iconSize: 60,
    url: links.web.incheck,
    accountTypes: ["PERSON", "COMPANY"],
    description: {
      COMPANY: "in_check_description.company",
      PERSON: "in_check_description.person",
    },
    enableOnlyTo: [
      "4d7a2110-45c5-465d-bccf-806413fc1034",
      "d4164ad8-7ff7-4bfa-81d1-3498b8ba1a48",
      "8f83f47b-b081-4ceb-960a-3ecc2af287ba",
      "e4dac8a5-0593-490a-98bc-b68aa7a4d263",
      "ff10a931-e804-48c2-becf-19b7d133c183",
      "c33855b1-6ffb-4cda-a499-a5c96b786b3a"
    ],
    redirectType: "internal",
  },
  {
    title: "system_configurations",
    slug: MODULE_TYPES.task_manager,
    icon: SettingsIcon,
    iconSize: 60,
    url: `${links.web.settings}`,
    accountTypes: ["COMPANY"],
    description: {
      COMPANY: "system_configurations_description.company",
      PERSON: "system_configurations_description.person",
    },
    redirectType: "internal",
  },

  {
    title: "in_point",
    slug: MODULE_TYPES.in_point,
    icon: InpontoIcon,
    iconSize: 60,
    url: "https://inponto.incicle.com/",
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "in_point_description",
      PERSON: "in_point_description",
    },
    redirectType: "external",
  },
  {
    title: "corporative_university",
    slug: MODULE_TYPES.task_manager,
    icon: SteponeIcon,
    iconSize: 60,
    url: "https://lp.stepone.com.br/",
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "corporative_university_description",
      PERSON: "corporative_university_description",
    },
    redirectType: "external",
  },
  {
    title: "ombudsman",
    slug: MODULE_TYPES.ombudsman,
    icon: OmbudsmanIcon,
    iconSize: 60,
    url: `${links.web.ombudsman}`,
    accountTypes: ["COMPANY", "PERSON"],
    description: {
      COMPANY: "ombudsman_description.company",
      PERSON: "ombudsman_description.person",
    },
    redirectType: "internal",
  },
  {
    title: "hrconnect",
    slug: MODULE_TYPES.hr_connect,
    icon: HRConnectIcon,
    iconSize: 60,
    url: `${links.web.hrconnect}`,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: null,
      PERSON: "hrconnect_description.person",
    },
    redirectType: "internal",
  },
  {
    title: "climate_research",
    slug: MODULE_TYPES.climate_research,
    icon: ClimateResearchDisabledIcon,
    iconSize: 60,
    accountTypes: ["COMPANY"],
    url: null,
    description: {
      COMPANY: "climate_research_description",
      PERSON: null,
    },
    redirectType: "internal",
  },
];

export const incicleCollaboratorsMenuModules: MenuModulesType[] = [
  {
    title: "personal_department",
    slug: MODULE_TYPES.all,
    icon: PersonalDepartmentIcon,
    iconSize: 60,
    url: links.web.department,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: "personal_department_description",
      PERSON: "personal_department_description",
    },
    permission: "general_dashboard",
    redirectType: "internal",
  },
  {
    title: "endomarketing",
    slug: MODULE_TYPES.schedule,
    icon: EndoMarketingIcon,
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: null,
      PERSON: "endomarketing_description",
    },
    permission: "full_endomarketing",
    redirectType: "internal",
  },
  {
    title: "admission",
    slug: MODULE_TYPES.schedule,
    icon: AdmissionIcon,
    iconSize: 60,
    url: `${links.web.personal_department}/dashboard`,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: null,
      PERSON: "admission_description.permission",
    },
    permission: "full_personal_department",
    redirectType: "internal",
  },
  {
    title: "evaluation",
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: "evaluation_description",
      PERSON: "evaluation_description",
    },
    permission: "full_competency_management",
    redirectType: "internal",
  },
  {
    title: "in_check",
    slug: MODULE_TYPES.in_check,
    icon: InCheckIcon,
    iconSize: 60,
    url: `${links.web.incheck}/dashboard`,
    accountTypes: ["PERSON"],
    description: {
      COMPANY: "evaluation_description",
      PERSON: "evaluation_description",
    },
    permission: "in_check",
    redirectType: "internal",
  },
];

export const incicleManagerMenuModules: MenuModulesType = {
  title: "manager_panel",
  slug: MODULE_TYPES.all,
  icon: ManagerIcon,
  iconSize: 50,
  url: links.web.manager,
  accountTypes: ["PERSON"],
  description: {
    COMPANY: null,
    PERSON: "manager_panel_description",
  },
  redirectType: "internal",
};

export type FilterModulesType = {
  title: string;
  slug: MODULE_TYPES;
  icon: string;
  linkKey: keyof ModulesWeb | "disabled";
  userType: "BOTH" | "COMPANY" | "PERSON";
};

export const incicleNotificationModules: FilterModulesType[] = [
  {
    title: "all",
    slug: MODULE_TYPES.all,
    icon: "https://static-incicle.s3.amazonaws.com/all.svg",
    linkKey: null as any,
    userType: "BOTH",
  },
  {
    title: "schedule",
    slug: MODULE_TYPES.schedule,
    icon: "https://static-incicle.s3.amazonaws.com/agenda.svg",
    linkKey: "schedule",
    userType: "BOTH",
  },
  {
    title: "admission",
    slug: MODULE_TYPES.personal_department,
    icon: "https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg",
    linkKey: "personal_department",
    userType: "BOTH",
  },
  {
    title: "personal_department",
    slug: MODULE_TYPES.organizational_engineering,
    icon: "https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg",
    linkKey: "social",
    userType: "COMPANY",
  },
  {
    title: "endomarketing",
    slug: MODULE_TYPES.endomarketing,
    icon: "https://static-incicle.s3.amazonaws.com/endo-marketing.svg",
    linkKey: "social",
    userType: "COMPANY",
  },
  {
    title: "feedback",
    slug: MODULE_TYPES.feedback,
    icon: "https://static-incicle.s3.amazonaws.com/feedback.svg",
    linkKey: "social",
    userType: "BOTH",
  },
  {
    title: "projects",
    slug: MODULE_TYPES.project,
    icon: "https://static-incicle.s3.amazonaws.com/projetos.svg",
    linkKey: "project",
    userType: "BOTH",
  },
  {
    title: "evaluation",
    slug: MODULE_TYPES.evaluation360,
    icon: "https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg",
    linkKey: "evaluation",
    userType: "BOTH",
  },
  {
    title: "social_network",
    slug: MODULE_TYPES.social_network,
    icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
    linkKey: "social",
    userType: "BOTH",
  },
  // {
  //   title: "Rede Social",
  //   slug: MODULE_TYPES.group,
  //   icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
  //   linkKey: "social",
  //   userType: "BOTH",
  // },
  {
    title: "recruitment",
    slug: MODULE_TYPES.recruitment,
    icon: "https://static-incicle.s3.amazonaws.com/recruitment-disabled.svg",
    linkKey: "disabled",
    userType: "BOTH",
  },
  {
    title: "ombudsman",
    slug: MODULE_TYPES.ombudsman,
    icon: "https://static-incicle.s3.us-east-1.amazonaws.com/ombudsman_icon.svg",
    linkKey: "ombudsman",
    userType: "BOTH",
  },
  {
    title: "climate_research",
    slug: MODULE_TYPES.climate_research,
    icon: "https://static-incicle.s3.amazonaws.com/pesquisa-clima-disabled.svg",
    linkKey: "disabled",
    userType: "COMPANY",
  },
  {
    title: "policies_and_procedures",
    slug: MODULE_TYPES.policy,
    icon: "https://static-incicle.s3.amazonaws.com/policies.svg",
    linkKey: "policy",
    userType: "BOTH",
  },
  {
    title: "okr",
    slug: MODULE_TYPES.okr,
    icon: "https://static-incicle.s3.amazonaws.com/okr-icon.svg",
    linkKey: "okr",
    userType: "BOTH",
  },
];
