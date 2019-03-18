import {
    GET_VEHICLE_DATA,
    GET_VEHICLE_DATA_SUCCESS,
    GET_VEHICLE_DATA_FAILURE
} from '../constants/ActionTypes';

export const getVehicleData = (payload) => {
    return {
        type: GET_VEHICLE_DATA,
        payload
    };
};

export const getVehicleDataSuccess = (payload) => {
    return {
        type: GET_VEHICLE_DATA_SUCCESS,
        payload
    };
};

export const getVehicleDataFailure = (error) => {
    return {
        type: GET_VEHICLE_DATA_FAILURE,
        payload: error
    };
};
