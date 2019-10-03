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
    return (
        <>
            <Nav firstName={user.firstName} lastName={user.lastName} />
            <main style={{marginTop: '64px'}}>
                <Days days={user.days} email={user.email} id={user.id} />
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
