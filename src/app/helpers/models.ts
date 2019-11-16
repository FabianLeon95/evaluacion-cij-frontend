import {map} from 'rxjs/operators';
import {Club} from '../models/club.model';
import {Question} from '../models/question.model';

export const mapClub = map((resp: any) => {
  return new Club(resp.data);
});

export const mapClubs = map((resp: any) => {
  return resp.data.map((club: any) => {
    return new Club(club);
  });
});

export const mapQuestion = map((resp: any) => {
  return new Question(resp.data);
});

export const mapQuestions = map((resp: any) => {
  return resp.data.map((club: any) => {
    return new Question(club);
  });
});
