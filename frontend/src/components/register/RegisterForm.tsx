import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPass] = useState('');
    const [password2, setPass2] = useState('');
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [registered, setReg] = useState(false);
    const [errors, setErrors] = useState([]);
    const [_isMounted, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
    }, []);

    //Handler for inputfield changes
    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'firstName' && _isMounted) {
            setFirstName(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'lastName') {
            setLastName(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'password') {
            setPass(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'password2') {
            setPass2(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'email2') {
            setEmail2(e.currentTarget.value);
        }
    };

    const validationErrors = () => {
        if (errors.length === 0) {
            return null;
        } else {
            const messages: Array<any> = [];
            errors.forEach((error: any) => {
                messages.push(
                    <div
                        key={error.error}
                        className="alert alert-danger"
                        role="alert">
                        {error.error}
                    </div>,
                );
            });
            return messages;
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);
        const obj = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            password2: password2,
            email: email,
            email2: email2,
        };
        fetch('/users/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res: any) => {
            if (res.status === 200) {
                setReg(true);
            } else if (res.status === 400) {
                res.json().then((body: any) => {
                    setErrors(body.errors);
                });
            }
        });
    };

    if (registered) {
        return <Redirect to={'/users/login'} />;
    }

    return (
        <div>
            <div className="registerform-container">
                <form className="registerform" onSubmit={onSubmit}>
                    <div className="registerform-group">
                        {validationErrors()}
                    </div>
                    <div className="registerform-input-fields">
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="firstName">
                                First Name
                            </label>
                        </div>
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="lastName">
                                Last Name
                            </label>
                        </div>
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="text"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="email">
                                Email
                            </label>
                        </div>
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="text"
                                name="email2"
                                value={email2}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="email2">
                                Confirm Email
                            </label>
                        </div>
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="password">
                                Password
                            </label>
                        </div>
                        <div className="registerform-group">
                            <input
                                className="registerform-control"
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={onInputChange}
                                required
                            />
                            <label
                                className="registerform-control-placeholder"
                                htmlFor="password2">
                                Confirm password
                            </label>
                        </div>
                        <div className="registerform-group">
                            <button className="btn submitBtn" type="submit">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
