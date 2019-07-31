import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuc] = useState(false);

    const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === 'email') {
            setEmail(e.currentTarget.value);
        }
        if (e.currentTarget.name === 'pass') {
            setPass(e.currentTarget.value);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const obj = {
            email: email,
            pass: pass,
        };
        fetch('/users/login', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {'Content-Type': 'application/json'},
        })
            .then((res: any) => {
                if (res.status === 200) {
                    setSuc(true);
                }
            })
            .catch(err => {
                console.error(err);
                console.log(err.status);
                alert('Error while logging in. Try again');
            });
    };

    if (success) {
        return <Redirect to={'/users/dashboard'} />;
    }

    return (
        <div className="loginform-container">
            <form className="loginform" onSubmit={onSubmit}>
                <div className="loginform-group">
                    <input
                        className="loginform-control"
                        type="text"
                        name="email"
                        value={email}
                        onChange={onInputChange}
                        required
                    />
                    <label
                        className="loginform-control-placeholder"
                        htmlFor="email">
                        Email
                    </label>
                </div>
                <div className="loginform-group">
                    <input
                        className="loginform-control"
                        type="password"
                        name="pass"
                        value={pass}
                        onChange={onInputChange}
                        required
                    />
                    <label
                        className="loginform-control-placeholder"
                        htmlFor="pass">
                        Password
                    </label>
                </div>
                <div className="loginform-group">
                    <button className="btn loginBtn">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
