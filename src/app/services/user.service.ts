import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ResponseWithUsers } from '../models/response-with-users.model';
import { environment } from 'src/environments/environment';

const baseUrl = environment.base_url + 'users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ResponseWithUsers> {
    return this.http.get<ResponseWithUsers>(baseUrl);
  }

  getById(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  getByPage(
    pageNumber: number,
    pageSize: number
  ): Observable<ResponseWithUsers> {
    return this.http.get<ResponseWithUsers>(
      `${baseUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}`
    );
  }

  editUsers(users: User[]): Observable<any> {
    return this.http.post(baseUrl + 'edit', users, httpOptions);
  }
}
