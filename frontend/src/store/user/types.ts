//User
interface _IUser {
    firstName: String;
    lastName: String;
    email: String;
    days: Array<any>;
}

//Action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';

//Interface
interface login {
    type: typeof LOGIN;
    payload: IUser;
}

interface logout {
    type: typeof LOGOUT;
    payload: IUser;
}

export type userActionTypes = login | logout;
export type IUser = _IUser;
