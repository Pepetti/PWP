import React from 'react';

const Dashboard: React.FC = () => {
    const press = () => {
        console.log(sessionStorage.getItem('token'));
    };

    return (
        <div>
            <button type="button" onClick={press}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
