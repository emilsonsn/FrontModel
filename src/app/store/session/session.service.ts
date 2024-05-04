import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { SessionStore } from "./session.store";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { tap, catchError, map, take, mergeMap, shareReplay } from 'rxjs/operators';
import { EMPTY, Observable, of } from "rxjs";
import { applyTransaction, resetStores } from "@datorama/akita";
import { AuthService } from "@services/auth.service";
import { LocalStorageService } from "@services/local-storage.service";
import { UserInfo } from "@model/user";
import { environment } from "@env/environment";
import { UserService } from "@services/user.service";
import { SessionQuery } from "./session.query";

@Injectable({
	providedIn: 'root'
})
export class SessionService {
	constructor(
		private readonly _sessionStore: SessionStore,
		private readonly _sessionQuery: SessionQuery,
		private readonly _router: Router,
		private readonly _toastr: ToastrService,
    private readonly _authService: AuthService,
		private readonly _userService: UserService,
		private readonly _storage: LocalStorageService
	) {}

	private _setLoading(status: boolean) {
		this._sessionStore.setLoading(status);
	}

	public isAuthenticated(): Observable<boolean> {
		return of(!!this._storage.get('token'));
	}

	public updateIsAuthenticated(isAuthenticated: boolean) {
		applyTransaction(() => {
			this._sessionStore.setLoading(false);
			this._sessionStore.update({ isAuthenticated });
		});
	}

	public logout() {
		this._authService.logout()
			.pipe(take(1))
			.subscribe();
		resetStores();
		this._storage.clear();
		this.updateIsAuthenticated(false);
		this._router.navigate(['/login']);
	}

  public login(email: string, password: string) {
		this._authService.login({email, password})
			.pipe(take(1))
			.subscribe({
				next: this.handleLoginResponse.bind(this),
				error: this.handleLoginError.bind(this),
			});
	}

  public handleLoginResponse(response: any): void {		
		this._router.navigate(['/painel']);
		this._storage.set('token', response.token);
		this.updateIsAuthenticated(true);
		this.getUser().subscribe();
  }

  public handleLoginError(err: any): void {
	this._toastr.warning(err.error.error);
  }

	public getUser(): Observable<UserInfo> {
		return this._sessionStore
			._select(state => state.userInfo)
			.pipe(
				mergeMap(userInfo => {
					if (userInfo) {
						return of(userInfo);
					}
					return this.getUserFromBack();
				})
			);
	}

	public getUserFromBack(): Observable<UserInfo> {
		return this._userService.userInfo()
			.pipe(
				map(userInfo => userInfo.data),
				tap(userInfo => {
					this._sessionStore.update({ userInfo })
				}),
				shareReplay()
			)
	}

}