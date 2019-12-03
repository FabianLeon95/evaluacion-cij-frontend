import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {handleHttpError} from '../helpers/errors';
import {mapQuestion, mapQuestions} from '../helpers/models';
import {Question} from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<Question[]> {
    return this.http.get(`${environment.apiUrl}/api/questions`)
      .pipe(
        handleHttpError,
        mapQuestions
      );
  }

  getByType(type: string): Observable<Question[]> {
    return this.http.get(`${environment.apiUrl}/api/questions?type=${type}`)
      .pipe(
        handleHttpError,
        mapQuestions
      );
  }

  get(id: number): Observable<Question> {
    return this.http.get(`${environment.apiUrl}/api/questions/${id}`)
      .pipe(
        handleHttpError,
        mapQuestion
      );
  }

  store(body: any): Observable<Question> {
    return this.http.post(`${environment.apiUrl}/api/questions`, body)
      .pipe(
        handleHttpError,
        mapQuestion
      );
  }

  update(id: number, body: any): Observable<Question> {
    return this.http.put(`${environment.apiUrl}/api/questions/${id}`, body)
      .pipe(
        handleHttpError,
        mapQuestion
      );
  }

  delete(id: number): Observable<Question> {
    return this.http.delete(`${environment.apiUrl}/api/questions/${id}`)
      .pipe(
        handleHttpError,
        mapQuestion
      );
  }
}
