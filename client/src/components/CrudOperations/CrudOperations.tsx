import React, {useEffect, useState} from 'react';
import './CrudOperations.scss';
import Api from 'Api/Api';
import Menu from 'components/CrudOperations/Menu/Menu';

const CrudOperations = () => {
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
			const response = await Api.getMenu();
			modifyMenu(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	const clearMenu = async () => {
		try {
			await Api.clearMenu();
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
			await Api.saveDish(payload);
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
			await Api.updateDish(payload);
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
			await Api.deleteDish(payload);
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

export default CrudOperations;
