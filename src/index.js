
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
