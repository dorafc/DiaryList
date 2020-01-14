import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.css';

import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	// Initial the firebase database only once, pass down to child components in context
	<FirebaseContext.Provider value={new Firebase()}>
		<App />
	</FirebaseContext.Provider>, 
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
