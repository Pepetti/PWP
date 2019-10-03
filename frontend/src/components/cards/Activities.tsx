import React, {useState} from 'react';
import {connect} from 'react-redux';

import {updateUser} from '../../store/user/actions';
import {AppState} from '../../store';

interface IAct {
    activities: any;
    today: boolean;
    email: String;
    updateUser: typeof updateUser;
    id: String;
}

const Activities: React.FC<IAct> = ({activities, today, email, id, updateUser}) => {
    const [fields, setFields] = useState({
        type: null,
        reps: null,
        sets: [{weight: null}],
    });

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

    function handleChange(e: any) {
        const values = fields;
        const valueName = e.target.name;
        if (valueName === 'type') {
            values.type = e.target.value;
        } else if (valueName === 'reps') {
            values.reps = e.target.value;
        }
        setFields(values);
    }

    function handleSetChange(e: any, idx: number) {
        const values = fields;
        values.sets[idx].weight = e.target.value;
        setFields(values);
    }

    function removeActi(idx: number) {
        const date = new Date().toISOString().split('T')[0];
        const AID = activities[idx].activityId;
        const dataToSend = {
            date: date,
            email: email,
            activityID: AID,
        };
        const token = sessionStorage.getItem('Auth');
        const authHead = 'Bearer ' + token;

        fetch('/users/day/activity', {
            method: 'DELETE',
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json', Authorization: authHead},
        }).then((res: any) => {
            if (res.status === 404) {
                alert('NOT FOUND');
            } else if (res.status === 500) {
                alert('SOMETHING WENT WRONG');
            } else if (res.status === 200) {
                res.json().then((body: any) => {
                    const {firstName, lastName, email, days, id} = body.usr;
                    const newUsr = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        days: days,
                        id: id,
                    };
                    updateUser(newUsr);
                });
            }
        });
    }

    function removeRoutine(idx: number, routineIdx: number) {
        const date = new Date().toISOString().split('T')[0];
        const AID = activities[idx].activityId;
        const RID = activities[idx].routines[routineIdx].routineId;
        const dataToSend = {
            date: date,
            id: id,
            activityId: AID,
            routineId: RID,
        };
        const token = sessionStorage.getItem('Auth');
        const authHead = 'Bearer ' + token;

        fetch('/users/day/activity/routine', {
            method: 'DELETE',
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json', Authorization: authHead},
        }).then((res: any) => {
            if (res.status === 404) {
                alert('NOT FOUND');
            } else if (res.status === 500) {
                alert('SOMETHING WENT WRONG');
            } else if (res.status === 200) {
                res.json().then((body: any) => {
                    const {firstName, lastName, email, days, id} = body.usr;
                    const newUsr = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        days: days,
                        id: id,
                    };
                    updateUser(newUsr);
                });
            }
        });
    }

    function addRoutine(e: any, idx: number) {
        e.preventDefault();
        const date = new Date().toISOString().split('T')[0];
        const AID = activities[idx].activityId;
        const dataToSend = {
            date: date,
            id: id,
            activityId: AID,
            routine: fields,
        };
        const token = sessionStorage.getItem('Auth');
        const authHead = 'Bearer ' + token;

        fetch('/users/day/activity/routine', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json', Authorization: authHead},
        }).then((res: any) => {
            if (res.status === 404) {
                alert('NOT FOUND');
            } else if (res.status === 500) {
                alert('SOMETHING WENT WRONG');
            } else if (res.status === 200) {
                res.json().then((body: any) => {
                    const {firstName, lastName, email, days, id} = body.usr;
                    const newUsr = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        days: days,
                        id: id,
                    };
                    updateUser(newUsr);
                });
            }
        });
    }

    const Acts = activities.map((act: any, idx: number) => (
        <div className="row justify-content-content" style={{paddingBottom: '10px'}} key={act._id}>
            <div className="card" style={{width: '45rem'}}>
                <h6 className="card-title">Activity #{idx + 1}</h6>
                <div className="row" style={{marginBottom: '10px'}}>
                    <div className="col-3">
                        <button className="btn btn-danger" onClick={() => removeActi(idx)}>
                            Delete Activity
                        </button>
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
                                    <div className="row">
                                        <div className="col-3">
                                            <button
                                                className="btn btn-danger"
                                                style={{marginBottom: '10px'}}
                                                onClick={() => removeRoutine(idx, routineIdx)}>
                                                Delete Routine
                                            </button>
                                        </div>
                                        <div className="col-3">
                                            <button
                                                className="btn btn-warning"
                                                style={{marginBottom: '10px'}}
                                                data-toggle="modal"
                                                data-target="#setModal">
                                                Add Routine
                                            </button>
                                        </div>
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
            {/*TÄHÄN MODAL KOODI*/}
            <div
                className="modal fade"
                id="setModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="setModalLabel"
                aria-hidden="true">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="setModalLabel">
                            Add a New Routine
                        </h5>
                        <div className="modal-body">
                            <form onSubmit={e => addRoutine(e, idx)}>
                                <div className="form-group">
                                    <div className="form-row">
                                        <label htmlFor="type">Routine Type</label>
                                        <input
                                            type="text"
                                            name="type"
                                            id="type"
                                            placeholder="Routine Type (Deadlift etc...)"
                                            value={fields.type || ''}
                                            required
                                            onChange={e => handleChange(e)}
                                            style={{width: '100%'}}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <label htmlFor="reps">Reps per Set</label>
                                        <input
                                            type="number"
                                            id="reps"
                                            placeholder="Number of Reps per Set"
                                            name="reps"
                                            min="0"
                                            max="1000"
                                            value={fields.reps || ''}
                                            onChange={e => handleChange(e)}
                                            required
                                            style={{width: '100%'}}
                                        />
                                    </div>
                                    {fields.sets.map((set, addRoutineIdx) => {
                                        return (
                                            <div key={`${2}-${idx}`}>
                                                <div className="form-row">
                                                    <label htmlFor="set" style={{marginTop: '10px'}}>
                                                        Set #{addRoutineIdx + 1}
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="set"
                                                        id="set"
                                                        placeholder="Weight in Kilograms (ex 10)..."
                                                        min="0"
                                                        max="500"
                                                        value={set.weight || ''}
                                                        style={{width: '100%'}}
                                                        required
                                                        onChange={e => handleSetChange(e, addRoutineIdx)}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="modal-footer">
                                    <div className="form-group">
                                        <div className="form-row">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">
                                                    Add
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button type="button" className="btn btn-warning" data-dismiss="modal">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return <div className="row justify-content-center">{Acts}</div>;
};

export default connect(
    null,
    {updateUser},
)(Activities);
