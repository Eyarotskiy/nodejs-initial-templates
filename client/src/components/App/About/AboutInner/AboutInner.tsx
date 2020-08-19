import React from 'react';
import {RouteComponentProps} from 'react-router';
import 'components/App/About/AboutInner/AboutInner.scss';

type RouteProps = {
	id?: string,
};

const AboutInner = (props: RouteComponentProps<RouteProps>) => {
	return (
		<div className="AboutInner">
			<h2 className="title">AboutInner Component</h2>
			<p className="text">{props.match.params.id}</p>
		</div>
	);
};

export default AboutInner;
