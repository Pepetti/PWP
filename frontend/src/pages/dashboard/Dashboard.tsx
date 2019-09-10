import React from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../store';
import {IUser} from '../../store/user/types';
import Nav from '../../components/nav/Nav';
import Days from '../../components/cards/Days';

type IDash = {
    user: IUser;
};

const Dashboard: React.FC<IDash> = ({user}) => {
    console.log(typeof user.days);
    return (
        <>
            <Nav firstName={user.firstName} lastName={user.lastName} />
            <main style={{marginTop: '64px'}}>
                <Days days={user.days} />
            </main>
        </>
    );
};

const mapStateToProps = (state: AppState) => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    {},
)(Dashboard);
