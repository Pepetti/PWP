import './login.css';

import React from 'react';

import LoginForm from '../../components/login/LoginForm';

interface ILoginPage {
    login: (
        firstname: String,
        lastname: String,
        email: String,
        days: Array<any>,
        id: String
    ) => void;
}

const Login: React.FC<ILoginPage> = ({login}) => {
    return (
        <div className="container login-container">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <div className="row justify-content-center">
                            <p>
                                {' '}
                                <i
                                    className="fas fa-sign-in-alt"
                                    style={{fontSize: 80}}></i>
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: 40,
                                        paddingLeft: 5,
                                    }}>
                                    Login
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <LoginForm login={login} />
                        </div>
                    </div>
                    <footer className="card-footer text-muted">
                        <p>
                            Don't have an account? -{' '}
                            <a href="/users/register">Register</a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Login;
