import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import React from 'react';

import {login} from './store/user/actions';
import {AppState} from './store';
import {IUser} from './store/user/types';
import Auth from './components/auth/Auth';
import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

interface IApp {
    login: typeof login;
    user: IUser;
}

class App extends React.Component<IApp> {
    _login = (
        firstname: String,
        lastname: String,
        email: String,
        days: Array<any>,
        id: String
    ) => {
        this.props.login({
            firstName: firstname,
            lastName: lastname,
            email: email,
            days: days,
            id: id
        });
    };

    render() {
        return (
            <Router>
                <div className="App" style={{height: '100%'}}>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route
                            path="/users/register"
                            exact
                            component={Register}
                        />
                        <Route
                            path="/users/login"
                            exact
                            render={() => <Login login={this._login} />}
                        />
                        <Route
                            path="/users/dashboard"
                            component={Auth(Dashboard)}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    {login},
)(App);
