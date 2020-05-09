import React, { useEffect } from 'react';
import axios from 'axios';
import './customers.css';

const Customers = () => {
	useEffect(() => {
		getCustomers();
	}, []);

	const getCustomers = async () => {
		try {
			const customers = await axios.get('/api/customers');
			console.log(customers.data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<h2>Customers</h2>
		</div>
	);
};

export default Customers;
