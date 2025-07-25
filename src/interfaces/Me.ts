import {
  ProjectViewType,
  RequestsSolicitation,
  ViewListFriends,
  ShowCalendar,
  ShowFriends,
  ShowLocation,
  ShowProjects,
} from '@/utils/enums';

export interface IMeCompany {
  id: string;
  name: string;
  avatar: string;
  user_id: string;
  logo: string | null;
  is_manager_competence: boolean;
  is_manager_in_check?: boolean;
  user: {
    id: string;
    username: string;
  };
  my_collaborator_id: string;
  redirects?: Redirect[];
}

export interface Redirect {
  type: number | string;
  url: string;
}
export interface ProfileConfig {
  created_at: string;
  default_timezone: string;
  id: string;
  people_share_my_publications: boolean;
  person_id: string;
  project_view: ProjectViewType;
  requests_solicitation: RequestsSolicitation;
  seo: boolean;
  show_calendar: ShowCalendar;
  show_friends: ShowFriends;
  show_location: ShowLocation;
  show_projects: ShowProjects;
  updated_at: string;
  view_list_friends: ViewListFriends;
}

export interface UserConfig {
  auth2f: boolean;
  default_interface: 'LIGHT' | 'DARK';
  default_language: string;
  default_timezone: string;
  id: string;
  user_id: string;
}

export interface IMeCollaborators {
  id: string;
  job: HierarchyInterface | null;
  unit: HierarchyInterface | null;
  level: HierarchyInterface | null;
  sector: HierarchyInterface | null;
  company: IMeCompany;
  is_manager_competence: boolean;
  is_manager_in_check?: boolean;
}

export interface HierarchyInterface {
  id: string;
  name: string;
}

export interface IMe {
  user_id: string;
  username: string;
  name: string;
  logo: string | null;
  type: 'COMPANY' | 'PERSON';
  cover: string | null;
  profile_id: string;
  avatar: string;
  collaborators: IMeCollaborators[];
  redirects?: Redirect[];
  profile_config: ProfileConfig;
  user_config: UserConfig;
  social_name: string;
}
