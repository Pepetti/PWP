import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPass] = useState('');
    const [password2, setPass2] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');

    //Handler for inputfield changes
    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'firstName') {
            setFirstName(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'lastName') {
            setLastName(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'password') {
            setPass(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'password2') {
            setPass(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'email2') {
            setEmail2(e.currentTarget.value);
        }
    };

    return (
        <div className="container register-form-container">
            <div className="row justify-content-center">
                <form className="registerForm">
                    <div className="row">
                        <div className="col registerGroup">
                            <input
                                className="form-control"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="form-control-placeholder"
                                htmlFor="name">
                                First Name
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
