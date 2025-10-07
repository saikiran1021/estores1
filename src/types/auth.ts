export type UserRole = 'employee' | 'admin' | 'college' | 'industry';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  role: UserRole;
}
