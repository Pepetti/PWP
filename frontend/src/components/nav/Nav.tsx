import './nav.css';

import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

interface INav {
    firstName: String;
    lastName: String;
}

const Nav: React.FC<INav> = ({firstName, lastName}) => {
    const [outSuccess, setSuc] = useState(false);

    const logout = () => {
        fetch('/users/logout', {
            method: 'GET',
            headers: new Headers({
                Authorization: 'Bearer ' + sessionStorage.getItem('Auth'),
            }),
        }).then((res: any) => {
            if (res.status === 200) {
                sessionStorage.removeItem('Auth');
                setSuc(true);
            }
        });
    };

    if (outSuccess) {
        return <Redirect to={'/'} />;
    }

    return (
        <header className="header">
            <nav className="header-nav">
                <div className="header-drawer-toggle-button"></div>
                <div className="header-nav-brand">
                    <a className="title-link" href="/users/dashboard">SportsTracker</a>
                </div>
                <div className="header-nav-spacer" />
                <div className="header-nav-items">
                    <ul>
                        <li>
                            <a href="/users/dashboard/profile">
                                <i className="fas fa-user-alt"></i> Profile
                            </a>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Nav;
