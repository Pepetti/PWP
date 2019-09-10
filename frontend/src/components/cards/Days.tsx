import React from 'react';

import Today from './Today';

interface IDays {
    days: Array<any>;
}

const Days: React.FC<IDays> = ({days}) => {
    //console.log(new Date().toISOString().split('T')[0]);
    const today = new Date().toISOString().split('T')[0];
    const findToday = days.filter(day => {
        return day.date === today;
    });
    //console.log(findToday);
    //const test = new Date(days[0].date).toISOString().split('T')[0]

    const cards = days.map(day => (
        <div className="row justify-content-center" key={day._id}>
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">{day.date}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Activity count: {day.activities.length}
                    </h6>
                </div>
            </div>
        </div>
    ));
    console.log(cards);
    return <div className="container justify-content-center">{cards}</div>;
};

export default Days;
