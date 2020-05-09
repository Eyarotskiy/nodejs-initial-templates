import React, { Component } from 'react';
import axios from 'axios';
import './customers.css';

class Customers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers: []
		};
	}

	componentDidMount() {
		this.getCustomers();
	}

	async getCustomers() {
		try {
			const customers = await axios.get('/api/customers');
			console.log(customers);
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<div>
				<h2>Customers</h2>
			</div>
		);
	}
}

export default Customers;
