import { GET_VEHICLE_DATA, GET_VEHICLE_DATA_SUCCESS, GET_VEHICLE_DATA_FAILURE } from '../constants/ActionTypes';

const INIT_STATE = {
    loader: true,
    vehicleData: '',
    vehicleDataError: ''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_VEHICLE_DATA: {
            return {
                ...state,
                loader: true
            }
        }
        case GET_VEHICLE_DATA_SUCCESS: {
            return {
                ...state,
                loader: true,
                vehicleData: action.payload
            }
        }
        case GET_VEHICLE_DATA_FAILURE: {
            return {
                ...state,
                loader: true,
                vehicleData: {},
                vehicleDataError: 'An error occured loading vehicle Data'
            }
        }

        default:
            return state;
    }
}