import React from 'react';
import {connect} from 'react-redux';

import {updateUser} from '../../store/user/actions';
import {AppState} from '../../store';

interface IAct {
    activities: any;
    today: boolean;
    updateUser: typeof updateUser;
}

const Activities: React.FC<IAct> = ({activities, today, updateUser}) => {
    const weights = (idx: number, routineIdx: number) => {
        let we = '';
        const len = activities[idx].routines[routineIdx].sets.length;
        if (len === 1) {
            we = activities[idx].routines[routineIdx].sets[0].weight + 'KG';
        } else {
            for (let i = 0; i < len; i++) {
                if (i === 0) {
                    we = we + activities[idx].routines[routineIdx].sets[0].weight + 'KG';
                } else {
                    we = we + ', ' + activities[idx].routines[routineIdx].sets[i].weight + 'KG';
                }
            }
        }
        return we;
    };

    const Acts = activities.map((act: any, idx: number) => (
        <div className="row justify-content-content" style={{paddingBottom: '10px'}} key={act._id}>
            <div className="card" style={{width: '45rem'}}>
                <h6 className="card-title">Activity #{idx + 1}</h6>
                <div className="row" style={{marginBottom: '10px'}}>
                    <div className="col-3">
                        <button className="btn btn-danger">Delete Activity</button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-warning">Modify Activity</button>
                    </div>
                </div>
                <ul className="list-group list-grop-flush">
                    {act.routines.map((routine: any, routineIdx: number) => {
                        return (
                            <li className="list-group-item" key={routine._id}>
                                <p>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={'#collapse' + routine._id}
                                        aria-expanded="false"
                                        aria-controls={'collapse' + routine._id}>
                                        {routine.type} <i className="fas fa-arrow-down"></i>
                                    </button>
                                </p>
                                <div className="collapse" id={'collapse' + routine._id}>
                                    <div className="row col">
                                        <button className="btn btn-danger" style={{marginBottom: '10px'}}>
                                            Delete Routine
                                        </button>
                                    </div>
                                    <div className="row col">
                                        <p style={{fontWeight: 'bold'}}>
                                            Aerobic:{' '}
                                            <i style={{fontWeight: 'normal'}}>{routine.aerobic ? 'Yes' : 'No'}</i>
                                        </p>
                                    </div>
                                    <div className="row col">
                                        <p style={{fontWeight: 'bold'}}>
                                            Reps per Set: <i style={{fontWeight: 'normal'}}>{routine.reps}</i>
                                        </p>
                                    </div>
                                    <div className="row col">
                                        <p style={{fontWeight: 'bold'}}>
                                            Sets: <i style={{fontWeight: 'normal'}}>{routine.sets.length}</i>
                                        </p>
                                    </div>
                                    <div className="row col">
                                        <p style={{fontWeight: 'bold'}}>
                                            Weights per Set:{' '}
                                            <i style={{fontWeight: 'normal'}}>{weights(idx, routineIdx)}</i>
                                        </p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    ));

    return <div className="row justify-content-center">{Acts}</div>;
};

export default connect(
    null,
    {updateUser},
)(Activities);
