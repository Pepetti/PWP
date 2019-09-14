import React, {useState} from 'react';

import Activities from './Activities';

interface IToday {
    day: any;
}

const Today: React.FC<IToday> = ({day}) => {
    return (
        <div className="row justify-content-center">
            <div className="card" style={{width: '50rem'}}>
                <div className="card-body">
                    <div className="row justify-content-center">
                        <h5 className="card-title">Today</h5>
                    </div>
                    <div className="row justify-content-center">
                        <Activities activities={day.activities} today={true}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Today;
