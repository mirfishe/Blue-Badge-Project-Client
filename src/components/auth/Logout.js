import React, {useState} from "react";
import {Container, Col, Row, Button} from "reactstrap";

const Logout = (props) => {

    return (
        <div className="m-2">
            <Button color="info" size="sm" onClick={() => props.clearToken(undefined)}>Log Out</Button>
        </div>
    );
};

export default Logout;