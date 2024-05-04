import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { SessionService } from '@store/session/session.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HasSessionGuard {

  constructor(
    private readonly _sessionService: SessionService,
    private readonly _router: Router
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    // if (this.authService.isLoggedIn !== true) {
    //   window.alert('Access Denied, Login is Required to Access This Page!');
    //   this.router.navigate(['sign-in']);
    // }
    return true;
  }
}