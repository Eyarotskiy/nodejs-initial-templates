import React from 'react';
import './Menu.css';
import {IDish, MenuProps} from "../../common/types";
import {formatDate} from "../../common/utils";

const Menu = (props: MenuProps)  => {return (
		<div className="Menu">
			<table className="menu-table">
				<thead>
				<tr>
					<th>Dish ID</th>
					<th>Dish Creation Date</th>
					<th>Dish Name</th>
				</tr>
				</thead>
				<tbody>
				{props.menu.map((item: IDish) => (
					<tr key={item._id}>
						<td>{item._id}</td>
						<td>{formatDate(item.creation_date)}</td>
						<td>{item.name}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
};

export default Menu;
