import Menu from "./Menu/Menu";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './CRUDOperations.css';

const CRUDOperations = () => {
	const [dishCreateName, changeDishCreateName] = useState('');
	const [dishDeleteName, changeDishDeleteName] = useState('');
	const [dishOldUpdateName, changeDishOldUpdateName] = useState('');
	const [dishNewUpdateName, changeDishNewUpdateName] = useState('');
	const [menu, modifyMenu] = useState([]);

	const handleDishCreateNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		changeDishCreateName(e.target.value);
	};

	const handleDishDeleteNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		changeDishDeleteName(e.target.value);
	};

	const handleDishOldUpdateNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		changeDishOldUpdateName(e.target.value);
	};

	const handleDishNewUpdateNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		changeDishNewUpdateName(e.target.value);
	};

	useEffect(() => {
		async function getData() {
			await getMenu();
		}

		getData();
	}, []);

	const getMenu = async () => {
		try {
			const response = await axios.get('/api/menu/get');
			modifyMenu(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	const clearMenu = async () => {
		try {
			await axios.post('/api/menu/clear');
			modifyMenu([]);
		} catch (e) {
			console.log(e);
		}
	};

	const saveDish = async () => {
		try {
			const payload = {
				dishName: dishCreateName,
			};
			await axios.post('/api/dish/save', payload);
			await getMenu();
		} catch (e) {
			console.log(e);
		}
	};

	const updateDish = async () => {
		try {
			const payload = {
				oldDishName: dishOldUpdateName,
				newDishName: dishNewUpdateName,
			};
			await axios.post('/api/dish/update', payload);
			await getMenu();
		} catch (e) {
			console.log(e);
		}
	};

	const deleteDish = async () => {
		try {
			const payload = {
				dishName: dishDeleteName,
			};
			await axios.post('/api/dish/delete', payload);
			await getMenu();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className="CRUDOperations">
			<h2 className="title">CRUD operations</h2>
			<Menu menu={menu} />
			<div className="form-wrapper-single">
				<button className="btn btn-blue" onClick={clearMenu}>Clear menu</button>
			</div>
			<div className="form-wrapper">
				<div className="form-container">
					<input type="text" placeholder="Dish name"
								 className="form-input"
								 value={dishCreateName}
								 onChange={handleDishCreateNameChange} />
					<button className="btn btn-blue" onClick={saveDish}>Save dish</button>
				</div>
				<div className="form-container">
					<input type="text" placeholder="Dish name"
								 className="form-input"
								 value={dishOldUpdateName}
								 onChange={handleDishOldUpdateNameChange} />
					<input type="text" placeholder="New dish name"
								 className="form-input"
								 value={dishNewUpdateName}
								 onChange={handleDishNewUpdateNameChange} />
					<button className="btn btn-blue" onClick={updateDish}>Update dish</button>
				</div>
				<div className="form-container">
					<input type="text" placeholder="Dish name"
								 className="form-input"
								 value={dishDeleteName}
								 onChange={handleDishDeleteNameChange} />
					<button className="btn btn-blue" onClick={deleteDish}>Delete dish</button>
				</div>
			</div>
		</div>
	);
};

export default CRUDOperations;
