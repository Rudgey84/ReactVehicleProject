/**
* This is an example request. Create your own using best practises for
* handling asynchronous data fetching
**/
import "regenerator-runtime/runtime";
import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { GET_VEHICLES, GET_VEHICLE_DATA } from '../constants/ActionTypes';
import { getVehiclesSuccess, getVehiclesFailure } from '../actions/vehicles';
import { getVehicleDataSuccess, getVehicleDataFailure } from '../actions/vehicleData';
import _ from 'lodash';

function getVehicles(params) {
  return fetch('http://localhost:9988/api/vehicle')
    .then(response => response.json())
}

function getVehicleData(id) {
	return fetch(`http://localhost:9988/api/vehicle/${id.payload}`)
	  .then(response => response.json())
  }

function* getVehiclesRequest(params) {
	try {
		const vehicles = yield call(getVehicles, params);

		yield put(getVehiclesSuccess(vehicles));
	} catch (error) {
		yield put(getVehiclesFailure(error));
	}
}

function* getVehicleDataRequest(id) {
	try {

		const vehicleData = yield call(getVehicleData, id);

		yield put(getVehicleDataSuccess(vehicleData));
	} catch (error) {
		yield put(getVehicleDataFailure(error));
	}
}

export default function* rootSaga() {

	yield all([takeEvery(GET_VEHICLES, getVehiclesRequest)]);
	yield all([takeEvery(GET_VEHICLE_DATA, getVehicleDataRequest)]);
}