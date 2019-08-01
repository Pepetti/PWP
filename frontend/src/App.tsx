import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';
import {connect} from 'react-redux';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Dashboard from './pages/dashboard/Dashboard';
import Auth from './components/auth/Auth';

import {login} from './store/user/actions';

interface IApp {
    login: typeof login;
}

class App extends React.Component<IApp> {
    _login = (
        firstname: String,
        lastname: String,
        email: String,
        days: Array<any>,
    ) => {
        this.props.login({
            firstName: firstname,
            lastName: lastname,
            email: email,
            days: days,
        });
    };

    render() {
        return (
            <Router>
                <div className="App">
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

export default connect(
    null,
    {login},
)(App);
