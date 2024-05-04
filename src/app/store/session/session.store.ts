import { Injectable } from "@angular/core";
import { Store, StoreConfig, akitaConfig } from "@datorama/akita";
import { SessionState } from "@model/session";

export function createInitialState(): SessionState {
	return {
		isAuthenticated: false,
		userInfo: null,
	};
}

akitaConfig({
	resettable: true
})

@Injectable({
	providedIn: 'root'
})
@StoreConfig({ name: 'sessionState' })
export class SessionStore extends Store<SessionState> {
	constructor() {
		super(createInitialState());
	}

	clearSession(): void {
		this._setState(state => createInitialState());
	}
}