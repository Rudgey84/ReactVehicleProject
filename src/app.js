import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import VehicleList from './components/VehicleList';
import configureStore from './store';
export const store = configureStore();


render(
    <Provider store={store}>
        <VehicleList />
    </Provider>,
    document.getElementById('app'));
