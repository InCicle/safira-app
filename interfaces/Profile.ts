export interface IProfile {
  profile_id: string;
  name: string;
  avatar: string;
  type: 'PERSON' | 'COMPANY' | 'GROUP';
  username: string;
}
