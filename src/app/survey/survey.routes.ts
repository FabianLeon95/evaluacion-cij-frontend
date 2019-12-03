import {Routes} from '@angular/router';
import {ClubSurveyListComponent} from './club-survey-list/club-survey-list.component';
import {ClubSurveyComponent} from './club-survey/club-survey.component';
import {TextQuestionFormComponent} from './question-components/text-question-form/text-question-form.component';

export const SURVEY_ROUTES: Routes = [
  {path: '', redirectTo: 'clubs', pathMatch: 'full'},
  {path: 'clubs', component: ClubSurveyListComponent},
  {path: 'clubs/:id', component: ClubSurveyComponent},
  {path: 'test', component: TextQuestionFormComponent},
];
