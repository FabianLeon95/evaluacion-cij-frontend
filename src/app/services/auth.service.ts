import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {handleLoginError} from '../helpers/errors';
import {Observable} from 'rxjs';
import {LoginRequest} from '../models/login-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(body: LoginRequest): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, body)
      .pipe(
        handleLoginError
      );
  }

  logout(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auth/logout`);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
