import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, Navbar, NavItem, NavbarBrand, NavbarText} from "reactstrap";
import "./Header.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";

const Header = (props) => {

    // After login, this component isn't being refreshed
    // After logout, this component isn't being refreshed

    // const [headerSessionToken, setHeaderSessionToken] = useState(props.sessionToken);

    // useEffect(() => {
    //     console.log("Header.js props.sessionToken", props.sessionToken);
    //     // console.log("Header.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);

    return (
        <Navbar className="header">
            <NavbarBrand>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Wario_emblem.svg" width="40" height="40" alt=""/>
            </NavbarBrand>
                 <Nav className="headerNav">
                    <NavItem>
                        {props.sessionToken === null || props.sessionToken === undefined ? <Login baseURL={props.baseURL} setSessionToken={props.setSessionToken} /* updateToken={props.updateToken} */ /> : ""}
                    </NavItem>
                    <NavItem>
                        {props.sessionToken === null || props.sessionToken === undefined ? <Register baseURL={props.baseURL} setSessionToken={props.setSessionToken} /* updateToken={props.updateToken} */ /> : ""}
                    </NavItem>
                    <NavItem>
                        {props.sessionToken !== null && props.sessionToken !== undefined ? <Logout setSessionToken={props.setSessionToken} /* clearToken={props.clearToken} */ /> : ""}
                    </NavItem>
                 </Nav>
        </Navbar>
    );
};

export default Header;