export interface User {
    id: string;
    username: string;
    role: 'client' | 'manager';
    token?: string;
    password?: string;
  }