import axios, {AxiosResponse} from 'axios';
import {DishName, DishUpdateData} from 'common/types';

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
}
