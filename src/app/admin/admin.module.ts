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

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ClubIndexComponent,
    ClubCreateComponent,
    ClubEditComponent,
    QuestionIndexComponent,
    QuestionCreateComponent,
    QuestionEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}
