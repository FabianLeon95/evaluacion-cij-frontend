import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {handleHttpError} from '../helpers/errors';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) {
  }

  store(body: any) {
    return this.http.post(`${environment.apiUrl}/api/answer`, body)
      .pipe(
        handleHttpError
      );
  }

  getQuestionAnswers(clubId: number, questionId: number) {
    let queryString = '';
    if (localStorage.getItem('dateRange')) {
      const dateRange = JSON.parse(localStorage.getItem('dateRange'));
      queryString = `?start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;
    }

    return this.http.get(`${environment.apiUrl}/api/answer/club/${clubId}/question/${questionId}${queryString}`)
      .pipe(
        handleHttpError
      );
  }
}
