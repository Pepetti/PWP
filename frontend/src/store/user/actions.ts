import {IUser, LOGIN, LOGOUT, UPDATE_USER} from './types';

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

export function updateUser(newUser: IUser) {
    return {
        type: UPDATE_USER,
        payload: newUser,
    };
}
