export interface UserInfo {
	id?: number;
	name: string;
	email: string;
	surname?: string;
	group: UserGroup;
	img?: string;
}

export enum UserGroup {
	MASTER = "MASTER",
	MANAGER = "MANAGER",
	SUPPORT = "SUPPORT",
	FINANCIAL = "FINANCIAL",
	INTEGRATION = "INTEGRATION"
}