import React from 'react';
import './About.scss';
import {RouteComponentProps} from 'react-router';
import {Link, Route} from 'react-router-dom';
import AboutInner from './AboutInner/AboutInner';

const About = (props: RouteComponentProps) => {
	return (
		<div className="About">
			<h2 className="title">About Component</h2>

			<Link to={`${props.match.path}/about-inner/15`} className="nav-link">Inner page</Link>

			<Route path={`${props.match.path}/about-inner/:id`} component={AboutInner} />
		</div>
	);
};

export default About;
