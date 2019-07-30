import './home.css';

import React from 'react';
import {Link} from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="container">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <div className="row justify-content-md-center">
                            <i
                                className="fas fa-running"
                                style={{fontSize: 100}}></i>
                        </div>
                        <div className="row justify-content-md-center">
                            <p style={{fontWeight: 'bold', fontSize: 28}}>
                                Welcome to SportsTracker
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <Link to={'users/register'}>
                            <button
                                type="button"
                                className="btn registerBtn"
                                style={{
                                    maxWidth: 400,
                                    minWidth: 200,
                                    width: 400,
                                }}>
                                Register
                            </button>
                        </Link>
                    </div>
                    <div className="container loginBtn-container">
                        <div className="row justify-content-md-center">
                            <i className="accountQuestion">
                                Already have an account?
                            </i>
                        </div>
                        <div className="row justify-content-md-center">
                            <Link to={'/users/login'}>
                                <button
                                    type="button"
                                    className="btn loginBtn"
                                    style={{
                                        maxWidth: 400,
                                        minWidth: 200,
                                        width: 400,
                                    }}>
                                    Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
