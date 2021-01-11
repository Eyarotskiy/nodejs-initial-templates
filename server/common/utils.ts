import {UserData} from './types';

export function extractUserNames(users: UserData[]): string[] {
	return users.filter((user) => user.confirmed).map((user) => user.login);
}

export const formatDate = (): string => {
	const date = new Date();
	return ('0' + date.getDate()).slice(-2) + '-' +
		('0'+(date.getMonth()+1)).slice(-2) + '-' +
		date.getFullYear() + ' ' +
		('0' + date.getHours()).slice(-2) + ':' +
		('0' + date.getMinutes()).slice(-2);
};
