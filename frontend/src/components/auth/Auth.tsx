import React from 'react';
import {Redirect} from 'react-router-dom';

function Auth<T>(Component: React.ComponentType<T>) {
    return class extends React.Component<T> {
        state = {loading: true, redirect: false};
        async componentDidMount() {
            const token = sessionStorage.getItem('Auth');
            fetch('/users/auth', {
                method: 'GET',
                headers: new Headers({
                    Authorization: 'Bearer ' + token,
                }),
            })
                .then(res => {
                    if (res.status === 200) {
                        this.setState({loading: false});
                    }
                    if (res.status === 403) {
                        this.setState({loading: false, redirect: true});
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.setState({loading: false, redirect: true});
                });
        }

        render() {
            const {loading, redirect} = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/users/login" />;
            }
            return (
                <React.Fragment>
                    <Component {...this.props} />
                </React.Fragment>
            );
        }
    };
}

export default Auth;
