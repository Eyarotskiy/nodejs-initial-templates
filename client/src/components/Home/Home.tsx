import React from 'react';
import './Home.scss';
import CrudOperations from 'components/CrudOperations/CrudOperations';
import FileUpload from 'components/FileUpload/FileUpload';

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
