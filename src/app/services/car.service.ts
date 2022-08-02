import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { ResponseWithCars } from '../models/response-with-cars.model';
import { environment } from 'src/environments/environment';
import { SortAndPageCarmodel } from '../models/sort-and-page-car.model';

const baseUrl = environment.base_url + 'cars';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ResponseWithCars> {
    return this.http.get<ResponseWithCars>(baseUrl);
  }

  getById(id: any): Observable<Car> {
    return this.http.get<Car>(`${baseUrl}/${id}`);
  }

  getSorted(
    sortAndPageCarModel: SortAndPageCarmodel
  ): Observable<ResponseWithCars> {
    return this.http.get<ResponseWithCars>(baseUrl, {
      params: { ...sortAndPageCarModel },
    });
  }
}
