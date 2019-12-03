import {Routes} from '@angular/router';
import {ClubIndexComponent} from './maintenance/club/club-index/club-index.component';
import {ClubCreateComponent} from './maintenance/club/club-create/club-create.component';
import {ClubEditComponent} from './maintenance/club/club-edit/club-edit.component';
import {QuestionIndexComponent} from './maintenance/question/question-index/question-index.component';
import {QuestionCreateComponent} from './maintenance/question/question-create/question-create.component';
import {QuestionEditComponent} from './maintenance/question/question-edit/question-edit.component';
import {AnswersClubListComponent} from './answers/answers-club-list/answers-club-list.component';
import {ClubAnswersComponent} from './answers/club-answers/club-answers.component';

export const ADMIN_ROUTES: Routes = [
  {path: '', redirectTo: 'answers', pathMatch: 'full'},
  {path: 'answers', component: AnswersClubListComponent},
  {path: 'answers/club/:id', component: ClubAnswersComponent},
  {path: 'clubs', component: ClubIndexComponent},
  {path: 'clubs/create', component: ClubCreateComponent},
  {path: 'clubs/:id/edit', component: ClubEditComponent},
  {path: 'questions', component: QuestionIndexComponent},
  {path: 'questions/create', component: QuestionCreateComponent},
  {path: 'questions/:id/edit', component: QuestionEditComponent},
];
