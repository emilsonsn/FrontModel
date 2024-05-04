import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Order, PageControl } from '@model/application';
import { UserInfo } from '@model/user';
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-table-users',
	templateUrl: './table-users.component.html',
	styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

	@Input()
	searchTerm?: string = null;

	@Input()
	loading: boolean = false;

	@Output()
	onUserClick: EventEmitter<UserInfo> = new EventEmitter<UserInfo>();

	@Output()
	onDeleteUserClick: EventEmitter<number> = new EventEmitter<number>();

	public users: UserInfo[] = [];

	public columns = [
		{
			slug: 'id',
			order: true,
			title: 'ID',
			align: 'start'
		},
		{
			slug: 'name',
			order: true,
			title: 'NOME',
			align: 'center'
		},
		{
			slug: 'email',
			order: true,
			title: 'EMAIL',
			align: 'center'
		},
		{
			slug: 'grupo',
			order: false,
			title: 'GRUPO',
			align: 'center'
		},
		{
			slug: '',
			order: false,
			title: 'AÇÕES',
			align: 'center'
		},
	];

	public pageControl: PageControl = {
		take: 10,
		page: 1,
		itemCount: 0,
		pageCount: 0,
		orderField: 'id',
		order: Order.ASC,
	};

	constructor(
		private readonly _toastr: ToastrService,
		private readonly _userService: UserService

	) { }

	ngOnInit(): void {
	}

	private _initOrStopLoading(): void {
		this.loading = !this.loading;
	};

	ngOnChanges(changes: SimpleChanges): void {
		const { searchTerm, loading } = changes;

		if (searchTerm?.previousValue && searchTerm?.currentValue !== searchTerm?.previousValue) {
			this._onSearch();
		} else if (!loading?.currentValue) {
			this._onSearch();
		}
	}

	get getLoading(){
		return !!this.loading;
	  }

	private _onSearch() {
		this.pageControl.search_term = this.searchTerm;
		this.pageControl.page = 1;
		this.search();
	}

	search(): void {
		this._initOrStopLoading();

		this._userService.getUsers(this.pageControl)
			.pipe(finalize(() => this._initOrStopLoading()))
			.subscribe(res => {
				this.users = res.data;

				this.pageControl.page = res.current_page;
				this.pageControl.itemCount = res.total;
				this.pageControl.pageCount = res.last_page;
			})
	}

	onClickOrderBy(slug: string, order: boolean) {
		if (!order) {
			return;
		}

		if (this.pageControl.orderField === slug) {
			this.pageControl.order = this.pageControl.order === Order.ASC ? Order.DESC : Order.ASC;
		} else {
			this.pageControl.order = Order.ASC;
			this.pageControl.orderField = slug;
		}
		this.pageControl.page = 1;
		this.search();
	}

	pageEvent($event) {
		this.pageControl.page = $event.pageIndex + 1;
		this.pageControl.take = $event.pageSize;
		this.search();
	}
}
