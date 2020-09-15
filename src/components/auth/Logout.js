import React, {useState} from "react";
import {Container, Col, Row, Button} from "reactstrap";

const Logout = (props) => {

    return (
        <div className="m-2">
        {props.sessionToken !== undefined ? <Button color="info" size="sm" onClick={() => props.setSessionToken(undefined)}>Log Out</Button> : ''}
        </div>
    );
};

export default Logout;