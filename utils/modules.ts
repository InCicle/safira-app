import { links, ModulesWeb } from '@/safira-app/config/links';
import { MeProps } from '@/safira-app/interfaces/Me';
import { MODULE_TYPES } from '@/safira-app/services/notifications';

import SteponeIcon from '@/safira-app/components/InHeader/components/icons/SteponeIcon';
import ScheduleIcon from '@/safira-app/components/InHeader/components/icons/ScheduleIcon';
import AdmissionIcon from '@/safira-app/components/InHeader/components/icons/AdmissionIcon';
import PersonalDepartmentIcon from '@/safira-app/components/InHeader/components/icons/PersonalDepartmentIcon';
import EndoMarketingIcon from '@/safira-app/components/InHeader/components/icons/EndoMarketingIcon';
import FeedbackIcon from '@/safira-app/components/InHeader/components/icons/FeedbackIcon';
import ProjectManagementIcon from '@/safira-app/components/InHeader/components/icons/ProjectManagementIcon';
import CompetencyIcon from '@/safira-app/components/InHeader/components/icons/CompetencyIcon';
import SocialNetworkIcon from '@/safira-app/components/InHeader/components/icons/SocialNetworkIcon';
import PolicyIcon from '@/safira-app/components/InHeader/components/icons/PolicyIcon';
import OkrIcon from '@/safira-app/components/InHeader/components/icons/OkrIcon';
import TaskIcon from '@/safira-app/components/InHeader/components/icons/TaskIcon';
import InCheckIcon from '@/safira-app/components/InHeader/components/icons/InCheckIcon';
import SettingsIcon from '@/safira-app/components/InHeader/components/icons/SettingsIcon';
import InpontoIcon from '@/safira-app/components/InHeader/components/icons/InpontoIcon';
import ManagerIcon from '@/safira-app/components/InHeader/components/icons/ManagerIcon';
import OmbudsmanIcon from '@/safira-app/components/InHeader/components/icons/OmbudsmanIcon';
import HRConnectIcon from '@/safira-app/components/InHeader/components/icons/HRConnectIcon';
import ClimateResearchIcon from '@/safira-app/components/InHeader/components/icons/ClimateResearchIcon';

export type MenuModulesType = {
  title: string;
  icon: string | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconSize: number;
  url: string | null;
  slug: string;
  accountTypes: MeProps['type'][];
  description: {
    [K in MeProps['type']]: string | null;
  };
  permission?: string;
  enableOnlyTo?: string[];
  redirectType: 'internal' | 'external';
};

export const incicleMenuModules: MenuModulesType[] = [
  {
    title: 'schedule',
    slug: MODULE_TYPES.schedule,
    icon: ScheduleIcon,
    iconSize: 60,
    url: links.web.schedule,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'schedule_description',
      PERSON: 'schedule_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'admission',
    slug: MODULE_TYPES.schedule,
    icon: AdmissionIcon,
    iconSize: 60,
    url: links.web.personal_department,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'admission_description.company',
      PERSON: 'admission_description.person',
    },
    redirectType: 'internal',
  },
  {
    title: 'personal_department',
    slug: MODULE_TYPES.schedule,
    icon: PersonalDepartmentIcon,
    iconSize: 60,
    url: links.web.department,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'personal_department_description',
      PERSON: 'personal_department_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'endomarketing',
    slug: MODULE_TYPES.schedule,
    icon: EndoMarketingIcon,
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'endomarketing_description',
      PERSON: null,
    },
    redirectType: 'internal',
  },
  {
    title: 'feedback',
    slug: MODULE_TYPES.schedule,
    icon: FeedbackIcon,
    iconSize: 60,
    url: `${links.web.social}/feedback`,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'feedback_description.company',
      PERSON: 'feedback_description.person',
    },
    redirectType: 'internal',
  },
  {
    title: 'projects',
    slug: MODULE_TYPES.project,
    icon: ProjectManagementIcon,
    iconSize: 60,
    url: links.web.project,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'projects_description',
      PERSON: 'projects_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'evaluation',
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'evaluation_description',
      PERSON: null,
    },
    redirectType: 'internal',
  },
  {
    title: 'evaluation',
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation + '/user_view',
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'evaluation_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'social_network',
    slug: MODULE_TYPES.social_network,
    icon: SocialNetworkIcon,
    iconSize: 60,
    url: links.web.social,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'social_network_description',
      PERSON: 'social_network_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'policies_and_procedures',
    slug: MODULE_TYPES.policy,
    icon: PolicyIcon,
    iconSize: 60,
    accountTypes: ['COMPANY', 'PERSON'],
    url: links.web.policy,
    description: {
      COMPANY: 'policies_and_procedures_description',
      PERSON: 'policies_and_procedures_description_person',
    },
    redirectType: 'internal',
  },
  {
    title: 'okr',
    slug: '',
    icon: OkrIcon,
    iconSize: 60,
    accountTypes: ['COMPANY', 'PERSON'],
    url: links.web.okr,
    description: {
      COMPANY: 'okr_description',
      PERSON: 'okr_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'tasks',
    slug: MODULE_TYPES.task_manager,
    icon: TaskIcon,
    iconSize: 60,
    url: `${links.web.schedule}/taskmanager`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'tasks_description',
    },
    redirectType: 'internal',
  },
  {
    title: 'in_check',
    slug: MODULE_TYPES.in_check,
    icon: InCheckIcon,
    iconSize: 60,
    url: links.web.incheck,
    accountTypes: ['PERSON', 'COMPANY'],
    description: {
      COMPANY: 'in_check_description.company',
      PERSON: 'in_check_description.person',
    },
    enableOnlyTo: [
      '4d7a2110-45c5-465d-bccf-806413fc1034',
      'd4164ad8-7ff7-4bfa-81d1-3498b8ba1a48',
      '8f83f47b-b081-4ceb-960a-3ecc2af287ba',
      'e4dac8a5-0593-490a-98bc-b68aa7a4d263',
      'ff10a931-e804-48c2-becf-19b7d133c183',
      'c33855b1-6ffb-4cda-a499-a5c96b786b3a',
      '0d89f852-b668-400c-aa44-21ca27070460',
      'f3211394-f05b-4d61-a20c-478eea1bd200',
      '27b1d388-b9ce-4999-9189-01118412a4e9',
      '52778a5e-ee6d-4884-86a9-cad72599f0f6',
      '0c6ec009-c8c3-4f2f-8606-4246144ef39d',
      '714ddf63-5104-43a5-a1e9-32ba20e8bb3b'
    ],
    redirectType: 'internal',
  },
  {
    title: 'system_configurations',
    slug: MODULE_TYPES.task_manager,
    icon: SettingsIcon,
    iconSize: 60,
    url: `${links.web.settings}`,
    accountTypes: ['COMPANY'],
    description: {
      COMPANY: 'system_configurations_description.company',
      PERSON: 'system_configurations_description.person',
    },
    redirectType: 'internal',
  },

  {
    title: 'in_point',
    slug: MODULE_TYPES.in_point,
    icon: InpontoIcon,
    iconSize: 60,
    url: 'https://inponto.incicle.com/',
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'in_point_description',
      PERSON: 'in_point_description',
    },
    redirectType: 'external',
  },
  {
    title: 'corporative_university',
    slug: MODULE_TYPES.task_manager,
    icon: SteponeIcon,
    iconSize: 60,
    url: 'https://lp.stepone.com.br/',
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'corporative_university_description',
      PERSON: 'corporative_university_description',
    },
    redirectType: 'external',
  },
  {
    title: 'ombudsman',
    slug: MODULE_TYPES.ombudsman,
    icon: OmbudsmanIcon,
    iconSize: 60,
    url: `${links.web.ombudsman}`,
    accountTypes: ['COMPANY', 'PERSON'],
    description: {
      COMPANY: 'ombudsman_description.company',
      PERSON: 'ombudsman_description.person',
    },
    redirectType: 'internal',
  },
  {
    title: 'hrconnect',
    slug: MODULE_TYPES.hr_connect,
    icon: HRConnectIcon,
    iconSize: 60,
    url: `${links.web.hrconnect}`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'hrconnect_description.person',
    },
    redirectType: 'internal',
  },
  {
    title: 'climate_research',
    slug: MODULE_TYPES.climate_research,
    icon: ClimateResearchIcon,
    iconSize: 60,
    accountTypes: ['COMPANY', 'PERSON'],
    url: `${links.web.survey}`,
    description: {
      COMPANY: 'climate_research_description.company',
      PERSON: 'climate_research_description.person',
    },
    enableOnlyTo: [
      "9d99be3a-d5e1-4bcf-bff1-cf7081f4472c",
      "e4e444c0-3e3f-4b12-a6d8-d8869bcf38e3",
      "63c88351-3386-4a8f-8b6f-a61ab594fe70",
      "1197599f-dac0-4a1f-9d08-efab8961efa1",
      "4d7a2110-45c5-465d-bccf-806413fc1034",
      "ff10a931-e804-48c2-becf-19b7d133c183",
      "6e7014c0-2180-4fd0-8784-9f1c565b4a3c",
      "e8d115a0-292d-4667-844e-7b55da609cb8",
      "9aa8b411-f234-4fad-9397-3e7398a1b865",
      "ba4bbc38-d3d4-485e-9469-dc7a84556db4",
      "5858fa0b-1085-4594-a873-5410965eaa6d",
      "e2acf78d-56f2-4499-8526-76215f407f49",
      "65ce93b0-0f90-4afe-8dd4-310eb9090cf2",
      "2ee8ebcd-fdf7-4979-b1bf-33267d2a3c52",
      "07875b8c-2ec9-4cc2-ac6d-d770f732940a",
      "3a7293e0-21c9-4810-9313-aa13488d71a4",
      "f9c40b02-71dd-4b51-a33f-9ed82b4bebcb",
      "2f15884e-f9b4-41fc-b5f6-4e37285ab822",
      "f3800acf-7d45-4b60-ac2f-0fa24af20e66",
      "0c6ec009-c8c3-4f2f-8606-4246144ef39d",
      "93666bda-4c76-464d-a830-5811f0d19ed2",
      "17b98bc3-4f33-46d7-8e01-023646054f4a",
      "c88d4a95-5f81-4b5f-9caa-be151b45e5f4",
      "d44a5248-b4b3-4b59-ab9a-82d26684984a",
      "8e77187c-fe6e-41e0-93d7-b12148ef3f85",
      "de1e338a-4222-4a6e-91af-14536d2cf22f",
      "efba6dea-4b9e-4737-a4a0-4609cbfb8108",
      "0180f6ba-f3f1-4e91-becd-0c67eb578943",
      "d666d2f0-f4e0-40e1-b68f-219cab735195",
      "83182346-e156-4f9a-884d-e4195636a94a",
      "12dc0477-df37-434b-9f3a-de6335f094ac",
      "eb80c0ce-bb53-4513-a197-2dbd634bc4d0",
      "4209cea8-00da-4c8a-a944-2957a81a3e23",
      "9e3a4c54-8645-4732-b604-47fa445fa83a",
      "a84a2fde-4542-495d-9af4-124da8a54752",
      "339f3da1-d261-4ff3-b7fa-a51289473db6",
      "d8ee082a-24e9-4da2-8316-7b07fff56141",
      "0180f6ba-f3f1-4e91-becd-0c67eb578943",
      "d666d2f0-f4e0-40e1-b68f-219cab735195",
      "4c3a7edc-b048-492c-8d56-16d19a9abbb4",
      "1e799e8d-9c81-4cb4-99b1-fbadc96a66c7"
    ],
    redirectType: 'internal',
  },
];

export const incicleCollaboratorsMenuModules: MenuModulesType[] = [
  {
    title: 'personal_department',
    slug: MODULE_TYPES.all,
    icon: PersonalDepartmentIcon,
    iconSize: 60,
    url: links.web.department,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'personal_department_description',
      PERSON: 'personal_department_description',
    },
    permission: 'general_dashboard',
    redirectType: 'internal',
  },
  {
    title: 'endomarketing',
    slug: MODULE_TYPES.schedule,
    icon: EndoMarketingIcon,
    iconSize: 60,
    url: `${links.web.social}/endomarketing`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'endomarketing_description',
    },
    permission: 'full_endomarketing',
    redirectType: 'internal',
  },
  {
    title: 'admission',
    slug: MODULE_TYPES.schedule,
    icon: AdmissionIcon,
    iconSize: 60,
    url: `${links.web.personal_department}/dashboard`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: null,
      PERSON: 'admission_description.permission',
    },
    permission: 'full_personal_department',
    redirectType: 'internal',
  },
  {
    title: 'evaluation',
    slug: MODULE_TYPES.evaluation360,
    icon: CompetencyIcon,
    iconSize: 60,
    url: links.web.evaluation,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'evaluation_description',
      PERSON: 'evaluation_description',
    },
    permission: 'full_competency_management',
    redirectType: 'internal',
  },
  {
    title: 'in_check',
    slug: MODULE_TYPES.in_check,
    icon: InCheckIcon,
    iconSize: 60,
    url: `${links.web.incheck}/dashboard`,
    accountTypes: ['PERSON'],
    description: {
      COMPANY: 'in_check_description.company',
      PERSON: 'in_check_description.company',
    },
    permission: 'in_check',
    redirectType: 'internal',
  },
];

export const incicleManagerMenuModules: MenuModulesType = {
  title: 'manager_panel',
  slug: MODULE_TYPES.all,
  icon: ManagerIcon,
  iconSize: 50,
  url: links.web.manager,
  accountTypes: ['PERSON'],
  description: {
    COMPANY: null,
    PERSON: 'manager_panel_description',
  },
  redirectType: 'internal',
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
    title: 'all',
    slug: MODULE_TYPES.all,
    icon: 'https://static-incicle.s3.amazonaws.com/all.svg',
    linkKey: null as any,
    userType: 'BOTH',
  },
  {
    title: 'schedule',
    slug: MODULE_TYPES.schedule,
    icon: 'https://static-incicle.s3.amazonaws.com/agenda.svg',
    linkKey: 'schedule',
    userType: 'BOTH',
  },
  {
    title: 'admission',
    slug: MODULE_TYPES.admission,
    icon: 'https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg',
    linkKey: 'personal_department',
    userType: 'BOTH',
  },
  {
    title: 'personal_department',
    slug: MODULE_TYPES.personal_department,
    icon: 'https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg',
    linkKey: 'social',
    userType: 'COMPANY',
  },
  {
    title: 'endomarketing',
    slug: MODULE_TYPES.endomarketing,
    icon: 'https://static-incicle.s3.amazonaws.com/endo-marketing.svg',
    linkKey: 'social',
    userType: 'COMPANY',
  },
  {
    title: 'feedback',
    slug: MODULE_TYPES.feedback,
    icon: 'https://static-incicle.s3.amazonaws.com/feedback.svg',
    linkKey: 'social',
    userType: 'BOTH',
  },
  {
    title: 'projects',
    slug: MODULE_TYPES.project,
    icon: 'https://static-incicle.s3.amazonaws.com/projetos.svg',
    linkKey: 'project',
    userType: 'BOTH',
  },
  {
    title: 'evaluation',
    slug: MODULE_TYPES.evaluation360,
    icon: 'https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg',
    linkKey: 'evaluation',
    userType: 'BOTH',
  },
  {
    title: 'social_network',
    slug: MODULE_TYPES.social_network,
    icon: 'https://static-incicle.s3.amazonaws.com/rede-social.svg',
    linkKey: 'social',
    userType: 'BOTH',
  },
  {
    title: 'recruitment',
    slug: MODULE_TYPES.recruitment,
    icon: 'https://static-incicle.s3.amazonaws.com/recruitment-disabled.svg',
    linkKey: 'disabled',
    userType: 'BOTH',
  },
  {
    title: 'ombudsman',
    slug: MODULE_TYPES.ombudsman,
    icon: 'https://static-incicle.s3.us-east-1.amazonaws.com/ombudsman_icon.svg',
    linkKey: 'ombudsman',
    userType: 'BOTH',
  },
  {
    title: 'climate_research',
    slug: MODULE_TYPES.climate_research,
    icon: 'https://static-incicle.s3.amazonaws.com/pesquisa-clima-disabled.svg',
    linkKey: 'disabled',
    userType: 'COMPANY',
  },
  {
    title: 'policies_and_procedures',
    slug: MODULE_TYPES.policy,
    icon: 'https://static-incicle.s3.amazonaws.com/policies.svg',
    linkKey: 'policy',
    userType: 'BOTH',
  },
  {
    title: 'okr',
    slug: MODULE_TYPES.okr,
    icon: 'https://static-incicle.s3.amazonaws.com/okr-icon.svg',
    linkKey: 'okr',
    userType: 'BOTH',
  },
];
