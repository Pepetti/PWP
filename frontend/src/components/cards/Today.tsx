import React, {useState} from 'react';

import Activities from './Activities';

interface IToday {
    day: any;
}

const Today: React.FC<IToday> = ({day}) => {
    const [fields, setFields] = useState([
        {
            type: null,
            reps: null,
            sets: [{weight: null}],
        },
    ]);

    function handleChange(i: number, event: any) {
        const values = [...fields];
        const valueName = event.target.name;
        if (valueName === 'type') {
            values[i].type = event.target.value;
        } else if (valueName === 'reps') {
            values[i].reps = event.target.value;
        } else if (valueName === 'sets') {
            values[i].sets.push({weight: event.target.value});
        }
        setFields(values);
        console.log(fields[i].sets);
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

    let acti;

    if (day.length === 0 || day.activities.length === 0) {
        acti = (
            <div className="container">
                <div className="row justify-content-center">
                    <p>You have not done any activities today!</p>
                </div>
                <div className="row justify-content-center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#addForm">
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
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close">
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
                                            />
                                            <label
                                                htmlFor="aerobic"
                                                className="form-check-label">
                                                Aerobic
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => handleAdd()}>
                                            Add a new routine
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <ul className="list-group list-group-flush">
                                            {fields.map((field, idx) => {
                                                return (
                                                    <li
                                                        key={`${field}-${idx}`}
                                                        className="list-group-item">
                                                        <h6>
                                                            Routine #{idx + 1}
                                                        </h6>
                                                        <div className="form-row">
                                                            <label htmlFor="type">Routine Type</label>
                                                            <input
                                                                type="text"
                                                                name="type"
                                                                id="type"
                                                                placeholder="Routine Type (Deadlift etc...)"
                                                                value={
                                                                    field.type ||
                                                                    ''
                                                                }
                                                                onChange={e =>
                                                                    handleChange(
                                                                        idx,
                                                                        e,
                                                                    )
                                                                }
                                                                style={{
                                                                    width: '100%'
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
                                                                value={
                                                                    field.reps ||
                                                                    ''
                                                                }
                                                                onChange={e =>
                                                                    handleChange(
                                                                        idx,
                                                                        e,
                                                                    )
                                                                }
                                                                style={{width: '100%'}}
                                                            />
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        acti = <Activities activities={day.activities} today={true} />;
    }

    return (
        <div className="row justify-content-center">
            <div className="card" style={{width: '50rem'}}>
                <div className="card-body">
                    <div className="row justify-content-center">
                        <h5 className="card-title">Today</h5>
                    </div>
                    <div className="row justify-content-center">{acti}</div>
                </div>
            </div>
        </div>
    );
};

export default Today;
