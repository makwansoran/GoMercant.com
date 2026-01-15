export type MissionStatus = 'Open' | 'Pending Review' | 'Completed';
export type DeliverableType = 'Code' | 'CAD' | 'Data' | 'Design' | 'Autonomous Systems';

export interface Mission {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  bounty: number | string;
  deliverableType: string;
  posterName: string;
  posterId: string;
  posterEmail?: string;
  posterLogo?: string; // Company/organization logo
  contactName?: string;
  contactEmail?: string;
  contactAvatar?: string; // Contact person's avatar
  status: string;
  createdAt: string;
  updatedAt?: string;
  deadline: string;
  submissions?: number;
  winnerId?: string;
  reviews?: Review[];
  tags?: string[];
  requiredFiles?: string[];
  attachments?: string; // JSON string of uploaded files
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Empty array - all data now comes from database
export const missions: Mission[] = [];
