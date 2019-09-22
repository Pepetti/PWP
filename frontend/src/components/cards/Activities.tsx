import React from 'react';

interface IAct {
    activities: any;
    today: boolean;
}

const Activities: React.FC<IAct> = ({activities, today}) => {
    const Acts = activities.map((act: any) => (
        <div
            className="row justify-content-content"
            style={{paddingBottom: '10px'}}>
            <div className="card" style={{width: '45rem'}}>
                <h6 className="card-title">Activity</h6>
            </div>
        </div>
    ));

    return <div className="row justify-content-center">{Acts}</div>;
};

export default Activities;
