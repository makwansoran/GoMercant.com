export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalEarned: number;
  successRate: number;
  completedMissions: number;
  bio: string;
  skills: string[];
  portfolio: string[];
  joinDate: string;
}

// Empty array - all data now comes from database
export const users: User[] = [];
