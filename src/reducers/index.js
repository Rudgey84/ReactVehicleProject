import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Vehicles from './Vehicles';
import VehicleData from './VehicleData';

const reducers = combineReducers({
    thevehicles: Vehicles,
    vehicledata: VehicleData
});

export default reducers;