import {IUser} from './types';

export function extractUserNames(users: IUser[]): string[] {
	return users.map((user) => user.login);
}
