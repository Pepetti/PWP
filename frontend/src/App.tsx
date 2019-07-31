import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React from 'react';

import Home from './pages/home/Home';
import Register from './pages/register/Register';

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users/register" exact component={Register} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
