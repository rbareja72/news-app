import { CONNECTED, DISCONNECTED } from './Types';

const INITIAL_STATE = {
    isConnected: true
};

export const NetworkReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONNECTED:
            return { ...state, isConnected: true };
        case DISCONNECTED:
            return { ...state, isConnected: false };
        default:
            return state;
    }
};
