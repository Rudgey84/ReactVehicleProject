import {
    GET_VEHICLES,
    GET_VEHICLES_SUCCESS,
    GET_VEHICLES_FAILURE
} from '../constants/ActionTypes';

export const getVehicles = (payload) => {
    return {
        type: GET_VEHICLES,
        payload
    };
};

export const getVehiclesSuccess = (payload) => {
    return {
        type: GET_VEHICLES_SUCCESS,
        payload
    };
};

export const getVehiclesFailure = (error) => {
    return {
        type: GET_VEHICLES_FAILURE,
        payload: error
    };
};
