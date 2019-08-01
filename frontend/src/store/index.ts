import {createStore, combineReducers, applyMiddleware} from 'redux';
import {userReducer} from './user/reducer';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer = combineReducers({
    user: userReducer,
});

//export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    //Middlewares
    const middlewares = [thunkMiddleware];
    const middlewareEnhancer = applyMiddleware(...middlewares);

    //Create the store
    const store = createStore(
        rootReducer,
        composeWithDevTools(middlewareEnhancer),
    );

    store.subscribe(() => {
        sessionStorage.setItem('state', JSON.stringify(store.getState()));
    });

    return store;
}
