import { UserInfo } from "./user";

export interface SessionState {
	isAuthenticated: boolean;
	userInfo: UserInfo;
	token?: string;
}