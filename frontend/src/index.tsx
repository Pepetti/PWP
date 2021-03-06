import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store';

//Create store
const store = configureStore();

//Wrap app with provider
const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
