export interface User {
  user_id: number;
  full_name: string;
  email: string;
  role: string;
  avatar_url?: string;
  phone?: string;
  isActive: boolean;
}
