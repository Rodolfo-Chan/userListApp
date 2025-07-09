// src/features/users/services.ts
import type { User } from '../types/user';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('https://randomuser.me/api/?results=20');
  const data = await res.json();
  return data.results;
};
