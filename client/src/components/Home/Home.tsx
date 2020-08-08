import React from 'react';
import './Home.scss';
import CrudOperations from 'components/CrudOperations/CrudOperations';
import FileUpload from 'components/FileUpload/FileUpload';
import Analytics from 'components/Analytics/Analytics';
import Login from 'components/Login/Login';

const Home = () => {
	return (
		<div className="Home">
			<Login />
			<div className="divider"></div>
			<CrudOperations />
			<div className="divider"></div>
			<FileUpload />
			<div className="divider"></div>
			<Analytics />
		</div>
	);
};

export default Home;
