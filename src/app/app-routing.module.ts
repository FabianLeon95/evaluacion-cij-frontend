import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './admin/login/login.component';
import {AdminComponent} from './admin/admin.component';
import {ADMIN_ROUTES} from './admin/admin.routes';
import {AuthGuard} from './guards/auth.guard';
import {GuestGuard} from './guards/guest.guard';
import {SurveyComponent} from './survey/survey.component';
import {SURVEY_ROUTES} from './survey/survey.routes';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: ADMIN_ROUTES},
  {path: '', component: SurveyComponent, children: SURVEY_ROUTES},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
