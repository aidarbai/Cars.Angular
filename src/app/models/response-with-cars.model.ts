import { Car } from './car.model';

export interface ResponseWithCars {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  itemsCount: number;
  results: Car[];
}
