import React, {useState} from "react";
import {Container, Col, Row, Button} from "reactstrap";

const Logout = (props) => {

    return (
        <div>
            <Button color="info" size="sm" onClick={() => props.setSessionToken(undefined)}>Log Out</Button>
        </div>
    );
};

export default Logout;