import ReactGA from 'react-ga';

export const formatDate = (date: Date): string => {
	date = new Date(date);
	return ('0' + date.getDate()).slice(-2) + '-' +
		('0'+(date.getMonth()+1)).slice(-2) + '-' +
		date.getFullYear() + ' ' +
		('0' + date.getHours()).slice(-2) + ':' +
		('0' + date.getMinutes()).slice(-2);
};

export const getAppUrl = () => {
	return process.env.NODE_ENV === 'production' ?
		'https://shrouded-mountain-78571.herokuapp.com' :
		'http://localhost';
};

export const initGoogleAnalytics = () => {
	ReactGA.initialize('UA-82338925-1');
};

export const trackPageView = (page: string) => {
	ReactGA.pageview(page);
};

export const trackEvent = (categoryName: string, eventName: string) => {
	ReactGA.event({
		category: categoryName,
		action: eventName,
		label: 'labelName',
		value: 10,
		nonInteraction: false,
	});
};
