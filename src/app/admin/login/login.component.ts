import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  private loading: boolean;
  private form: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loading = false;
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      rememberToken: new FormControl(null)
    });
  }

  login() {
    if (this.form.valid) {
      this.loading = true;
      this.authService.login(this.form.value)
        .pipe(
          catchError(err => {
            this.loading = false;
            this.form.controls.password.reset();
            return throwError(err);
          })
        )
        .subscribe((resp: any) => {
          localStorage.setItem('token', resp.access_token);
          this.router.navigate(['admin']);
        });
    }
  }

  ngOnDestroy(): void {
    this.loading = false;
  }

}
