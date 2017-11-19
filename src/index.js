import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './components/App';
import notFound from './components/notFound';
import './css/main.css';

const Root = () => {
	return (
		<BrowserRouter basename="/real-estate-app-build/">
			<div>
				<Match exactly pattern="/" component={App} />
				<Miss component={notFound} />
			</div>
		</BrowserRouter>
	)
}

render(<Root />, document.querySelector('#main'));