import {LOGIN, LOGOUT, IUser, userActionTypes} from './types';

//Inital state of user
let initialState: IUser = {
    firstName: '',
    lastName: '',
    email: '',
    days: [],
};

let persistentState = sessionStorage.getItem('state');
if (persistentState) {
    const tempState = JSON.parse(persistentState);
    initialState = tempState.user;
}

export function userReducer(
    state = initialState,
    action: userActionTypes,
): IUser {
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...state, ...action.payload};
        default:
            return {...state};
    }
}
