import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button} from "reactstrap";

const Logout = (props) => {

    useEffect(() => {
        console.log("Logout.js props.sessionToken", props.sessionToken);
        // console.log("Header.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

    return (
        <div className="m-2">
            <Button color="info" onClick={() => props.setSessionToken(undefined)}>Log Out</Button>
        </div>
    );
};

export default Logout;