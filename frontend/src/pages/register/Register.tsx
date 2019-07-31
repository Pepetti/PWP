import './register.css';

import React from 'react';

import RegisterForm from '../../components/register/RegisterForm';

const Register: React.FC = () => {
    return (
        <div className="container register-container">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <div className="row justify-content-center">
                            <p>
                                <i
                                    className="fas fa-user-plus"
                                    style={{fontSize: 80}}></i>
                                <span
                                    style={{fontSize: 40, fontWeight: 'bold'}}>
                                    Register
                                </span>
                            </p>{' '}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <RegisterForm />
                        </div>
                    </div>
                    <footer className="card-footer text-muted">
                        <p>
                            Already have an account? -{' '}
                            <a href="/users/login">Login</a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Register;
