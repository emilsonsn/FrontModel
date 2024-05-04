import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@services/sidebar.service';
import { Utils } from '@shared/utils';
import { SessionService } from '@store/session/session.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	isMobile = false;
	userSubscription: Subscription;

	itemsMenu = [
		{
			type: 'link',
			label: 'Início',
			link: '/painel/home',
			icon: 'home',
			dropdown: false,
			active: false,
			children: []
		},
	];

	constructor(
		public router: Router,
		private readonly _sessionService: SessionService,
		public sidebarService: SidebarService
	) { }

	ngOnInit(): void {
		this.updateSidebar();
    this._getUser();
	}

	private _getUser(): void {
		this.userSubscription = this._sessionService.getUserFromBack()
			.subscribe(res => {
				if (res && res.group != "MASTER") {
					this.itemsMenu.pop();
				};
			})
	}

	updateSidebar() {
		this.sidebarService.active = !Utils.isMobile();
		this.isMobile = !Utils.isMobile();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.updateSidebar();
	}

	setActiveMenu(item) {
		setTimeout(() => {
			item.dropdown = !item.dropdown;
			item.link && this.router.navigate([`${item.link}`])
		}, 0);
	}

	toggleSidebar() {
		this.sidebarService.minSidebar = !this.sidebarService.minSidebar;
	}

	private _openUserDialog() {
		return
	}
}
