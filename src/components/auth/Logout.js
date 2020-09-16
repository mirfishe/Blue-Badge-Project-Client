import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button} from "reactstrap";

const Logout = (props) => {

    useEffect(() => {
        console.log("Logout.js localStorage token", localStorage.getItem("token"));
    }, []);

    return (
        <div className="m-2">
            <Button color="info" size="sm" onClick={() => props.clearToken(undefined)}>Log Out</Button>
        </div>
    );
};

export default Logout;