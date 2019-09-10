import React, {useState} from 'react';

interface IToday {
    day: Array<any>;
}

const Today: React.FC<IToday> = ({day}) => {
    const [hasDay, setHas] = useState(false);
    let theCard = null;

    if (day.length !== 0) {
        setHas(true);
    }

    if(!hasDay){
        theCard = (
            <></>
        )
    }


    return <div>today</div>;
};

export default Today;
