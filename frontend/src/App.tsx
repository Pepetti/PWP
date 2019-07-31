import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

const App: React.FC = () => {
    const Dashboard = () => {
        return <p>Things</p>;
    };
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users/register" exact component={Register} />
                    <Route path="/users/login" exact component={Login} />
                    <Route path="/users/dashboard" component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
