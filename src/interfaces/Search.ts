// Interface for an item on search bar on header
export interface SearchItemInterface {
  profile_id: string;
  name: string;
  avatar: string;
  type: 'PERSON' | 'COMPANY' | 'GROUP';
  username: string;
}
