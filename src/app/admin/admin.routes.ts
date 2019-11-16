import { Routes } from '@angular/router';
import { ClubIndexComponent } from './maintenance/club/club-index/club-index.component';
import { ClubCreateComponent } from './maintenance/club/club-create/club-create.component';
import { ClubEditComponent } from './maintenance/club/club-edit/club-edit.component';
import { QuestionIndexComponent } from './maintenance/question/question-index/question-index.component';
import { QuestionCreateComponent } from './maintenance/question/question-create/question-create.component';
import { QuestionEditComponent } from './maintenance/question/question-edit/question-edit.component';

export const ADMIN_ROUTES: Routes = [
    { path: 'clubs', component: ClubIndexComponent },
    { path: 'clubs/create', component: ClubCreateComponent },
    { path: 'clubs/:id/edit', component: ClubEditComponent },
    { path: 'questions', component: QuestionIndexComponent },
    { path: 'questions/create', component: QuestionCreateComponent },
    { path: 'questions/:id/edit', component: QuestionEditComponent },
];
