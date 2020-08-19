import React from 'react';
import 'components/App/Home/CrudOperations/Menu/Menu.scss';
import {formatDate} from 'common/utils';
import {IDish, IMenuProps} from 'common/types';

const Menu = (props: IMenuProps)  => {return (
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
