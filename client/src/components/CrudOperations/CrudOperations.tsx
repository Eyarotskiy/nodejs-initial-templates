import React, {useEffect, useState} from 'react';
import './CrudOperations.scss';
import Menu from 'components/CrudOperations/Menu/Menu';
import WebSocket from 'Api/WebSocket';
import Api from 'Api/Api';
const webSocket = new WebSocket();

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
		webSocket.getMenu(modifyMenu)
	}, []);

	const clearMenu = () => {
		webSocket.clearMenu();
	};

	const saveDish = () => {
		webSocket.saveDish(dishCreateName);
	};

	const updateDish = () => {
		const payload = {
			oldDishName: dishOldUpdateName,
			newDishName: dishNewUpdateName,
		};
		webSocket.updateDish(payload);
	};

	const deleteDish = () => {
		webSocket.deleteDish(dishDeleteName)
	};

	const getData = async () => {
		const response: any = await Api.getData();
		console.log(response.data);
	};

	return (
		<div className="CRUDOperations">
			<h2 className="title">CRUD operations (on WebSockets)</h2>
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
					<button className="btn btn-blue" onClick={saveDish}>
						Save dish
					</button>
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
					<button className="btn btn-blue" onClick={updateDish}>
						Update dish
					</button>
				</div>
				<div className="form-container">
					<input type="text" placeholder="Dish name"
								 className="form-input"
								 value={dishDeleteName}
								 onChange={handleDishDeleteNameChange} />
					<button className="btn btn-blue" onClick={deleteDish}>
						Delete dish
					</button>
				</div>
			</div>
			<div className="data-container">
				<div className="form-container">
					<button className="btn btn-blue" onClick={getData}>
						Call external API request
					</button>
				</div>
			</div>
		</div>
	);
};

export default CrudOperations;
