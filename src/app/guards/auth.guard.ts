import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {handleExpiredToken} from '../helpers/errors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private jwtHelper: JwtHelperService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated() || this.jwtHelper.isTokenExpired()) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']).then(handleExpiredToken);
      return false;
    }
    return true;
  }

}
