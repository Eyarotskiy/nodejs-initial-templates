import React from 'react';
import './Home.scss';
import CrudOperations from 'components/CrudOperations/CrudOperations';
import FileUpload from 'components/FileUpload/FileUpload';
import Analytics from 'components/Analytics/Analytics';

const Home = () => {
	console.log(process.env);
	return (
		<div className="Home">
			<CrudOperations />
			<div className="divider"></div>
			<FileUpload />
			<div className="divider"></div>
			<Analytics />
		</div>
	);
};

export default Home;
