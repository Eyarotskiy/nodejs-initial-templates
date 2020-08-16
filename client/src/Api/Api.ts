import axios, {AxiosResponse} from 'axios';
import {IDishName, IDishUpdateData, ILoginForm, Token} from 'common/types';

export default class Api {
	static getMenu(): Promise<AxiosResponse> {
		return axios.get('/api/menu/get')
	}

	static clearMenu(): Promise<AxiosResponse> {
		return axios.post('/api/menu/clear');
	}

	static saveDish(payload: IDishName): Promise<AxiosResponse> {
		return axios.post('/api/dish/save', payload);
	}

	static updateDish(payload: IDishUpdateData): Promise<AxiosResponse> {
		return axios.post('/api/dish/update', payload);
	}

	static deleteDish(payload: IDishName): Promise<AxiosResponse> {
		return axios.post('/api/dish/delete', payload);
	}

	static getData(): Promise<AxiosResponse> {
		return axios.get('/api/data/get');
	}

	static getUsers(): Promise<AxiosResponse> {
		return axios.get('/api/users/get');
	}

	static loginUser(payload: ILoginForm): Promise<AxiosResponse> {
		return axios.post('/login', payload);
	}

	static authenticateUser(token: Token): Promise<AxiosResponse> {
		return axios.get('/authenticate', {headers: {'auth-token': token}});
	}

	static registerUser(payload: ILoginForm): Promise<AxiosResponse> {
		return axios.post('/register', payload);
	}

	static setAuthHeader(token: string) {
		axios.defaults.headers.common['auth-token'] = token;
	}
}
