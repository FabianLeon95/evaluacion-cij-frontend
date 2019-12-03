import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {AdminComponent} from './admin.component';
import {LoginComponent} from './login/login.component';
import {ClubIndexComponent} from './maintenance/club/club-index/club-index.component';
import {ClubCreateComponent} from './maintenance/club/club-create/club-create.component';
import {ClubEditComponent} from './maintenance/club/club-edit/club-edit.component';
import {QuestionIndexComponent} from './maintenance/question/question-index/question-index.component';
import {QuestionCreateComponent} from './maintenance/question/question-create/question-create.component';
import {QuestionEditComponent} from './maintenance/question/question-edit/question-edit.component';
import {LoadingComponent} from './components/loading/loading.component';
import {AnswersClubListComponent} from './answers/answers-club-list/answers-club-list.component';
import {ClubAnswersComponent} from './answers/club-answers/club-answers.component';
import {AnswerComponent} from './answers/answer/answer.component';
import {AnswerChartComponent} from './answers/answer/answer-chart/answer-chart.component';
import {ChartsModule} from 'ng2-charts';
import { AnswerTextComponent } from './answers/answer/answer-text/answer-text.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ClubIndexComponent,
    ClubCreateComponent,
    ClubEditComponent,
    QuestionIndexComponent,
    QuestionCreateComponent,
    QuestionEditComponent,
    LoadingComponent,
    AnswersClubListComponent,
    ClubAnswersComponent,
    AnswerComponent,
    AnswerChartComponent,
    AnswerTextComponent,
  ],
  exports: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChartsModule,
  ]
})
export class AdminModule {
}
