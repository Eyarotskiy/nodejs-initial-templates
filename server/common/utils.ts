import {IUser} from './types';

export function extractUserNames(users: IUser[]): string[] {
	return users.filter((user) => user.confirmed).map((user) => user.login);
}
