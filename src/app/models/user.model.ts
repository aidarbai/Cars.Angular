export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isDeleted: boolean;
  bannedTime: Date;
  isBanned: boolean;
  roles: string[];
  cars: number[];
  refreshToken: string;
}
