import { CONNECTED, DISCONNECTED } from './Types';

export const networkStateChange = (dispatch, connectionInfo) => {
    if (connectionInfo.type === 'none') {
        dispatch({
            type: DISCONNECTED,
        });
    } else {
        dispatch({
            type: CONNECTED
        });
    }
};

