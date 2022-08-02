import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../models/change-password.model';
import { UserRegister } from '../models/user-register.model';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ResetPassword } from '../models/reset-password.model';

const AUTH_API = environment.base_url + 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  redirectUrl: string | null;

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email: username,
        password: password,
      },
      httpOptions
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post<string>(
      AUTH_API + 'ForgotPassword',
      `"${email}"`,
      httpOptions
    );
  }

  resetPassword(resetPassword: ResetPassword): Observable<any> {
    //console.log(JSON.stringify(resetPassword));
    return this.http.post(
      AUTH_API + 'ResetPassword',
      resetPassword,
      httpOptions
    );
  }

  changePassword(changePassword: ChangePassword): Observable<any> {
    //console.log(JSON.stringify(changePassword));
    return this.http.post(
      AUTH_API + 'changepassword',
      changePassword,
      httpOptions
    );
  }

  register(userRegister: UserRegister): Observable<any> {
    return this.http.post(AUTH_API + 'register', userRegister, httpOptions);
  }

  delete(): Observable<any> {
    return this.http.delete(AUTH_API + 'delete', httpOptions);
  }

  getNewToken(refreshToken: string): Observable<any> {
    return this.http.post<string>(
      AUTH_API + 'GetNewToken',
      `"${refreshToken}"`,
      httpOptions
    );
  }

  // logout(): Observable<any> {
  //   return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  // }
}
