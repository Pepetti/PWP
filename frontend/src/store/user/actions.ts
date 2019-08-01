import {IUser, LOGIN, LOGOUT} from './types';

//Actions
export function login(newLogin: IUser) {
    return {
        type: LOGIN,
        payload: newLogin,
    };
}

export function logout(newLogout: IUser) {
    return {
        type: LOGOUT,
        payload: newLogout,
    };
}
