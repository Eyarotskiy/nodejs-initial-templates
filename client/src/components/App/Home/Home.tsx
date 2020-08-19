import React from 'react';
import 'components/App/Home/Home.scss';
import CrudOperations from 'components/App/Home/CrudOperations/CrudOperations';
import FileUpload from 'components/App/Home/FileUpload/FileUpload';
import Analytics from 'components/App/Home/Analytics/Analytics';
import Login from 'components/App/Home/Login/Login';

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
