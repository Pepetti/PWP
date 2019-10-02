/**
 * DISCLAIMER
 * Please do not look at this file. The code is awfull,
 * it's mostly copy paste from my old code AND
 * I we didn't have enough time to properly style this
 * (or any of the pages)
 */
import React, {useState} from 'react';

import {connect} from 'react-redux';
import {updateUser} from '../../store/user/actions';
import {AppState} from '../../store';

import Activities from './Activities';

interface IToday {
    day: any;
    email: String;
    updateUser: typeof updateUser;
}

const Today: React.FC<IToday> = ({day, email, updateUser}) => {
    const [aerobic, setAer] = useState(false);
    const [fields, setFields] = useState([
        {
            type: null,
            reps: null,
            sets: [{weight: null}],
        },
    ]);

    let hasActi: Boolean = false;
    let newUsr: any = null;

    function handleAerobic() {
        setAer(!aerobic);
    }

    function handleChange(i: number, event: any) {
        const values = [...fields];
        const valueName = event.target.name;
        if (valueName === 'type') {
            values[i].type = event.target.value;
        } else if (valueName === 'reps') {
            values[i].reps = event.target.value;
        }
        setFields(values);
    }

    function handleSetChange(i: number, j: number, event: any) {
        const values = [...fields];
        values[i].sets[j].weight = event.target.value;
        setFields(values);
    }

    function handleAdd() {
        const values = [...fields];
        values.push({
            type: null,
            reps: null,
            sets: [{weight: null}],
        });
        setFields(values);
    }

    function handleSetAdd(i: number) {
        const values = [...fields];
        fields[i].sets.push({weight: null});
        setFields(values);
    }

    function handleRemove(i: number) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
    }

    function handleSetRemove(i: number, j: number) {
        const values = [...fields];
        values[i].sets.splice(j, 1);
        setFields(values);
    }

    function sendData() {
        const date = new Date().toISOString().split('T')[0];
        const dataToSend = {
            date: date,
            activity: {
                aerobic: aerobic,
                routines: fields,
            },
            email: email,
        };

        const token = sessionStorage.getItem('Auth');
        const authHead = 'Bearer ' + token;

        fetch('/users/day/activity', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {'Content-Type': 'application/json', Authorization: authHead},
        }).then((res: any) => {
            if (res.status === 401) {
                console.log('Got an error my guy');
                alert('ERROR');
            } else if (res.status === 200) {
                res.json().then((body: any) => {
                    const {firstName, lastName, email, days, id} = body.usr;
                    console.log(firstName);
                    newUsr = {
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

    let acti;

    if (day.length === 0 || day[0].activities.length === 0) {
        hasActi = false;
        acti = (
            <div className="container">
                <div className="row justify-content-center">
                    <p>You have not done any activities today!</p>
                </div>
                <div className="row justify-content-center">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addForm">
                        Add one now!
                    </button>
                </div>
                <div
                    className="modal fade"
                    id="addForm"
                    tabIndex={-1}
                    role="dialog"
                    aria-labelledby="addFormLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addFormLabel">
                                    Add an activity
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="aerobic"
                                                name="aerobic"
                                                defaultChecked={aerobic}
                                                onChange={handleAerobic}
                                            />
                                            <label htmlFor="aerobic" className="form-check-label">
                                                Aerobic
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary" onClick={() => handleAdd()}>
                                            Add a new routine
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <ul className="list-group list-group-flush">
                                            {fields.map((field, idx) => {
                                                return (
                                                    <li key={`${field}-${idx}`} className="list-group-item">
                                                        <div className="form-row">
                                                            <div className="col">
                                                                <h6>Routine #{idx + 1}</h6>
                                                            </div>
                                                            <div className="col justify-content-right">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleRemove(idx)}>
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="form-row">
                                                            <label htmlFor="type">Routine Type</label>
                                                            <input
                                                                type="text"
                                                                name="type"
                                                                id="type"
                                                                placeholder="Routine Type (Deadlift etc...)"
                                                                value={field.type || ''}
                                                                onChange={e => handleChange(idx, e)}
                                                                required
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="form-row">
                                                            <label htmlFor="reps">Reps per set</label>
                                                            <input
                                                                type="number"
                                                                id="reps"
                                                                placeholder="Number of Reps Per Set"
                                                                name="reps"
                                                                min="0"
                                                                max="1000"
                                                                value={field.reps || ''}
                                                                onChange={e => handleChange(idx, e)}
                                                                required
                                                                style={{
                                                                    width: '100%',
                                                                }}
                                                            />
                                                        </div>
                                                        {field.sets.map((set, setIdx) => {
                                                            return (
                                                                <div key={`${2}-${setIdx}`}>
                                                                    <div className="form-row">
                                                                        <label
                                                                            htmlFor="set"
                                                                            style={{marginTop: '10px'}}>
                                                                            Set #{setIdx + 1}
                                                                        </label>
                                                                        <input
                                                                            type="number"
                                                                            name="set"
                                                                            id="set"
                                                                            placeholder="Weight in Kilograms (ex. 10kg)..."
                                                                            min="0"
                                                                            max="500"
                                                                            value={set.weight || ''}
                                                                            style={{width: '100%'}}
                                                                            required
                                                                            onChange={e =>
                                                                                handleSetChange(idx, setIdx, e)
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="form-row">
                                                                        <button
                                                                            type="button"
                                                                            className="btn-sm btn-primary"
                                                                            style={{marginTop: '10px'}}
                                                                            onClick={() => handleSetAdd(idx)}>
                                                                            New Set
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn-sm btn-danger"
                                                                            style={{
                                                                                marginTop: '10px',
                                                                                marginLeft: '5px',
                                                                            }}
                                                                            onClick={() =>
                                                                                handleSetRemove(idx, setIdx)
                                                                            }>
                                                                            x
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => sendData()}
                                    data-dismiss="modal">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        acti = <Activities activities={day[0].activities} today={true} />;
        hasActi = true;
    }

    return (
        <div className="row justify-content-center">
            <div className="card" style={{width: '50rem', paddingTop: '50px'}}>
                <div className="card-body">
                    <div className="row justify-content-center">
                        <h5 className="card-title">Today</h5>
                    </div>
                    <div className="row justify-content-center">{acti}</div>
                </div>
                {hasActi ? (
                    <div className="card-body">
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addForm2">
                        Add New Activity
                    </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div
                className="modal fade"
                id="addForm2"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="addFormLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addFormLabel">
                                Add an activity
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="aerobic"
                                            name="aerobic"
                                            defaultChecked={aerobic}
                                            onChange={handleAerobic}
                                        />
                                        <label htmlFor="aerobic" className="form-check-label">
                                            Aerobic
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-primary" onClick={() => handleAdd()}>
                                        Add a new routine
                                    </button>
                                </div>
                                <div className="form-group">
                                    <ul className="list-group list-group-flush">
                                        {fields.map((field, idx) => {
                                            return (
                                                <li key={`${field}-${idx}`} className="list-group-item">
                                                    <div className="form-row">
                                                        <div className="col">
                                                            <h6>Routine #{idx + 1}</h6>
                                                        </div>
                                                        <div className="col justify-content-right">
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => handleRemove(idx)}>
                                                                X
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <label htmlFor="type">Routine Type</label>
                                                        <input
                                                            type="text"
                                                            name="type"
                                                            id="type"
                                                            placeholder="Routine Type (Deadlift etc...)"
                                                            value={field.type || ''}
                                                            onChange={e => handleChange(idx, e)}
                                                            required
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="form-row">
                                                        <label htmlFor="reps">Reps per set</label>
                                                        <input
                                                            type="number"
                                                            id="reps"
                                                            placeholder="Number of Reps Per Set"
                                                            name="reps"
                                                            min="0"
                                                            max="1000"
                                                            value={field.reps || ''}
                                                            onChange={e => handleChange(idx, e)}
                                                            required
                                                            style={{
                                                                width: '100%',
                                                            }}
                                                        />
                                                    </div>
                                                    {field.sets.map((set, setIdx) => {
                                                        return (
                                                            <div key={`${2}-${setIdx}`}>
                                                                <div className="form-row">
                                                                    <label htmlFor="set" style={{marginTop: '10px'}}>
                                                                        Set #{setIdx + 1}
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="set"
                                                                        id="set"
                                                                        placeholder="Weight in Kilograms (ex. 10kg)..."
                                                                        min="0"
                                                                        max="500"
                                                                        value={set.weight || ''}
                                                                        style={{width: '100%'}}
                                                                        required
                                                                        onChange={e => handleSetChange(idx, setIdx, e)}
                                                                    />
                                                                </div>
                                                                <div className="form-row">
                                                                    <button
                                                                        type="button"
                                                                        className="btn-sm btn-primary"
                                                                        style={{marginTop: '10px'}}
                                                                        onClick={() => handleSetAdd(idx)}>
                                                                        New Set
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn-sm btn-danger"
                                                                        style={{
                                                                            marginTop: '10px',
                                                                            marginLeft: '5px',
                                                                        }}
                                                                        onClick={() => handleSetRemove(idx, setIdx)}>
                                                                        x
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => sendData()}
                                data-dismiss="modal">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: AppState) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    {updateUser},
)(Today);
