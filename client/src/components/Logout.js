import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
    props.changeAuth(false);
    console.log(props)
    return (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} /> 
    )
}

export default Logout;
