import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

interface ILogin {
    login: (
        firstname: String,
        lastname: String,
        email: String,
        days: Array<any>,
        id: String
    ) => void;
}

const LoginForm: React.FC<ILogin> = ({login}) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [success, setSuc] = useState(false);
    const [errors, setErr] = useState([]);

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
        setErr([]);
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
                    res.json().then((body: any) => {
                        const {firstName, lastName, email, days, id} = body.usr;
                        const token = body.token;
                        login(firstName, lastName, email, days, id);
                        sessionStorage.setItem('Auth', token);
                        setSuc(true);
                    });
                }
                if (res.status === 401) {
                    res.json().then((body: any) => {
                        setErr(body);
                    });
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error while logging in. Try again');
            });
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

    if (success) {
        return <Redirect to={'/users/dashboard'} />;
    }

    return (
        <div className="loginform-container">
            <form className="loginform" onSubmit={onSubmit}>
                <div className="loginform-group">{validationErrors()}</div>
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
