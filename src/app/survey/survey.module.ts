import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SurveyComponent} from './survey.component';
import {RouterModule} from '@angular/router';

import {ClubSurveyListComponent} from './club-survey-list/club-survey-list.component';
import {ClubSurveyCardComponent} from './club-survey-card/club-survey-card.component';
import {ClubSurveyComponent} from './club-survey/club-survey.component';
import {BoolQuestionFormComponent} from './question-components/bool-question-form/bool-question-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StarsQuestionFormComponent} from './question-components/stars-question-form/stars-question-form.component';
import {TextQuestionFormComponent} from './question-components/text-question-form/text-question-form.component';

@NgModule({
  declarations: [
    SurveyComponent,
    ClubSurveyListComponent,
    ClubSurveyCardComponent,
    ClubSurveyComponent,
    BoolQuestionFormComponent,
    StarsQuestionFormComponent,
    TextQuestionFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class SurveyModule {
}
