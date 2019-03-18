import { GET_VEHICLES, GET_VEHICLES_SUCCESS, GET_VEHICLES_FAILURE } from '../constants/ActionTypes';

const INIT_STATE = {
    loader: true,
    vehicles: '',
    vehiclesError: ''
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_VEHICLES: {
            return {
                ...state,
                loader: true
            }
        }
        case GET_VEHICLES_SUCCESS: {
            return {
                ...state,
                loader: true,
                vehicles: action.payload
            }
        }
        case GET_VEHICLES_FAILURE: {
            return {
                ...state,
                loader: true,
                vehicles: {},
                vehiclesError: 'An error occured loading vehicles'
            }
        }

        default:
            return state;
    }
}