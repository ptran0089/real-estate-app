import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import notFound from './components/notFound';
import './css/main.css';

// const Root = () => {
// 	return (
// 		<BrowserRouter basename="/">
// 			<div>
// 				<Match exactly pattern="/" component={App} />
// 				<Miss component={notFound} />
// 			</div>
// 		</BrowserRouter>
// 	)
// }

render(<App />, document.querySelector('#main'));