import { User } from './user.model';

export interface ResponseWithUsers {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  itemsCount: number;
  results: User[];
}
