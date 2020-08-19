import React, {useEffect} from 'react';
import 'components/App/Home/Analytics/Analytics.scss';
import {initGoogleAnalytics, trackEvent, trackPageView} from 'common/utils';

const Analytics = () => {
	useEffect(() => {
		initGoogleAnalytics();
		trackPageView('yevTest');
	}, []);

	const handleClick = () => {
		trackEvent('testCategory', 'testEvent')
	};

	return (
		<div className="Analytics">
			<h2 className="title">Google Analytics</h2>
			<button className="btn btn-blue" onClick={handleClick}>
				Track Event to GA
			</button>
		</div>
	);
};

export default Analytics;
