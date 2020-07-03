import React from 'react';
import './Menu.css';
import {IDish, MenuProps} from "../../../common/types";

const Menu = (props: MenuProps)  => {
	return (
		<div className="Menu">
			<h2 className="menu-title">Menu</h2>
			<table className="menu-table">
				<thead>
				<tr>
					<th>Dish ID</th>
					<th>Dish Name</th>
				</tr>
				</thead>
				<tbody>
				{props.menu.map((item: IDish) => (
					<tr key={item._id}>
						<td>{item._id}</td>
						<td>{item.name}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default Menu;
