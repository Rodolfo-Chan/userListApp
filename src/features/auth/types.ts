import type { User } from '../../types/user';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}
