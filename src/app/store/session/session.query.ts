import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { SessionState } from "@model/session";
import { SessionStore } from "./session.store";

@Injectable({
	providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {
	isAuthenticated$ = this.select(state => state.isAuthenticated);
	userInfo$ = this.select(state => state.userInfo);
	token$ = this.select(state => state.token);

	constructor(protected store: SessionStore) {
		super(store);
	}
	
}