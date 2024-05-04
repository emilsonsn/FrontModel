import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Order, PageControl } from '@model/application';
import { UserInfo } from '@model/user';
import { SidebarService } from '@services/sidebar.service';
import { UserService } from '@services/user.service';
import { DialogUserComponent } from '@shared/dialogs/dialog-user/dialog-user.component';
import { SessionQuery } from '@store/session/session.query';
import { SessionService } from '@store/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, interval, take, takeWhile } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	isAuthenticated$: Observable<boolean>;
	userInfo$: Observable<UserInfo>;

	user: UserInfo;
	userSubscription: Subscription;

	public notifications: any;

	public notificationsNumber: any;

	public reloadNotification: any;

	public pageControl: PageControl = {
		take: 10,
		page: 1,
		itemCount: 0,
		pageCount: 0,
		orderField: 'id',
		order: Order.DESC,
		search_term: ''
	};

	constructor(
		private readonly _sidebarService: SidebarService,
		private readonly _sessionService: SessionService,
		private readonly _sessionQuery: SessionQuery,
		private readonly _userService: UserService,
		private readonly _dialog: MatDialog,
		private readonly _toastr: ToastrService,
	) { }

	ngOnInit(): void {
		this.isAuthenticated$ = this._sessionQuery.isAuthenticated$;
		this.userInfo$ = this._sessionQuery.userInfo$;

		this._getUser();
	}

	ngOnDestroy(): void {
		this.userSubscription.unsubscribe();
		this.reloadNotification.unsubscribe();
	}

	toggleSidebar() {
		this._sidebarService.active = !this._sidebarService.active;
	}

	signout() {
		this._sessionService.logout();
	}

	public openDialogUser(): void {
		const dialogConfig: MatDialogConfig = {
			maxWidth: '90%',
			width: '900px',
			maxHeight: '90%',
			hasBackdrop: true,
			closeOnNavigation: true,
		};

		this._dialog.open(DialogUserComponent, { ...dialogConfig, data: { user: this.user } })
			.afterClosed()
			.subscribe(res => {
				if (res) {
					if (res.id) {
						this._patchUser(res);
						return
					}
				}
			});
	}

	private _patchUser(user: UserInfo): void {
		this._userService.patchUser(user.id, user)
			.subscribe(res => {
				if (res.status) {
					this._toastr.success(res.message);
					this._getUser();
					return
				}

				this._toastr.error(res.message);
			})
	}

	private _getUser(): void {
		this.userSubscription = this._sessionService.getUserFromBack()
			.subscribe(res => {
				if (res) {
					this.user = res;
				}
			})
	}
}
