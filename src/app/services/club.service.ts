import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Club} from '../models/club.model';
import {handleHttpError} from '../helpers/errors';
import {mapClub, mapClubs} from '../helpers/models';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<Club[]> {
    return this.http.get(`${environment.apiUrl}/api/clubs`)
      .pipe(
        handleHttpError,
        mapClubs
      );
  }

  get(id: number): Observable<Club> {
    return this.http.get(`${environment.apiUrl}/api/clubs/${id}`)
      .pipe(
        handleHttpError,
        mapClub
      );
  }

  store(body: any): Observable<Club> {
    return this.http.post(`${environment.apiUrl}/api/clubs`, body)
      .pipe(
        handleHttpError,
        mapClub
      );
  }

  update(id: number, body: any): Observable<Club> {
    return this.http.post(`${environment.apiUrl}/api/clubs/${id}`, body)
      .pipe(
        handleHttpError,
        mapClub
      );
  }

  delete(id: number): Observable<Club> {
    return this.http.delete(`${environment.apiUrl}/api/clubs/${id}`)
      .pipe(
        handleHttpError,
        mapClub
      );
  }
}
