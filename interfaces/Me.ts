import {
  ProjectViewType,
  RequestsSolicitation,
  ViewListFriends,
  ShowCalendar,
  ShowFriends,
  ShowLocation,
  ShowProjects,
} from 'safira-app/config/enums';

export interface MeCompany {
  id: string;
  name: string;
  avatar: string;
  user_id: string;
  logo: string | null;
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

export interface CollaboratorsInterface {
  id: string;
  job: DPItemInterface | null;
  unit: DPItemInterface | null;
  level: DPItemInterface | null;
  sector: DPItemInterface | null;
  company: MeCompany;
  is_manager_competence: boolean;
  is_manager_in_check?: boolean;
}

export interface MeProps {
  user_id: string;
  username: string;
  name: string;
  logo: string | null;
  type: 'COMPANY' | 'PERSON';
  cover: string | null;
  profile_id: string;
  avatar: string;
  collaborators: CollaboratorsInterface[];
  redirects?: Redirect[];
  profile_config: ProfileConfig;
  user_config: UserConfig;
  social_name: string;
}

export interface DPItemInterface {
  id: string;
  name: string;
}