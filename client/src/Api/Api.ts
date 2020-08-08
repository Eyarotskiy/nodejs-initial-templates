import axios, {AxiosResponse} from 'axios';
import {DishName, DishUpdateData, LoginForm, Token} from 'common/types';

export default class Api {
	static async getMenu(): Promise<AxiosResponse> {
		return axios.get('/api/menu/get')
	}

	static async clearMenu(): Promise<AxiosResponse> {
		return axios.post('/api/menu/clear');
	}

	static async saveDish(payload: DishName): Promise<AxiosResponse> {
		return axios.post('/api/dish/save', payload);
	}

	static async updateDish(payload: DishUpdateData): Promise<AxiosResponse> {
		return axios.post('/api/dish/update', payload);
	}

	static async deleteDish(payload: DishName): Promise<AxiosResponse> {
		return axios.post('/api/dish/delete', payload);
	}

	static async getData(): Promise<AxiosResponse> {
		return axios.get('/api/data/get');
	}

	static async getUsers(): Promise<AxiosResponse> {
		return axios.get('/api/users/get');
	}

	static async loginUser(payload: LoginForm): Promise<AxiosResponse> {
		return axios.post('/login', payload);
	}

	static async authenticateUser(token: Token): Promise<AxiosResponse> {
		return axios.get('/authenticate', {headers: {'auth-token': token}});
	}

	static async registerUser(payload: LoginForm): Promise<AxiosResponse> {
		return axios.post('/register', payload);
	}
}
