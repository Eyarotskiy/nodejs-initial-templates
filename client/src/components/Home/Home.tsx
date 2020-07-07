import React from 'react';
import CrudOperations from '../CRUDOperations/CrudOperations';
import FileUpload from '../FileUpload/FileUpload';
import './Home.scss';

const Home = () => {
	return (
		<div className="Home">
			<CrudOperations />
			<div className="divider"></div>
			<FileUpload />
		</div>
	);
};

export default Home;
