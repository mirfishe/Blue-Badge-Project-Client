import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, NavbarBrand, NavbarText} from "reactstrap";
import "./Header.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";

const Header = (props) => {

    // After login, this component isn't being refreshed
    // After logout, this component isn't being refreshed

    // const [headerSessionToken, setHeaderSessionToken] = useState(props.sessionToken);

    useEffect(() => {
        console.log("Header.js props.sessionToken", props.sessionToken);
        // console.log("Header.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

    return (
            <Nav>
                <NavbarBrand>Logo</NavbarBrand>
                {/* {props.sessionToken === undefined ? <Login baseURL={props.baseURL} updateToken={props.updateToken} /> : ""}
                {props.sessionToken === undefined ? <Register baseURL={props.baseURL} updateToken={props.updateToken} /> : ""}
                {props.sessionToken !== undefined ? <Logout clearToken={props.clearToken} /> : ""} */}
                {props.sessionToken === null || props.sessionToken === undefined ? <Login baseURL={props.baseURL} setSessionToken={props.setSessionToken} /* updateToken={props.updateToken} */ /> : ""}
                {props.sessionToken === null || props.sessionToken === undefined ? <Register baseURL={props.baseURL} setSessionToken={props.setSessionToken} /* updateToken={props.updateToken} */ /> : ""}
                {props.sessionToken !== null && props.sessionToken !== undefined ? <Logout setSessionToken={props.setSessionToken} /* clearToken={props.clearToken} */ /> : ""}
            </Nav>
    );
};

export default Header;