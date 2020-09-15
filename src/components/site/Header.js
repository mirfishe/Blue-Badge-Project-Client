import React, {useState} from "react";
import {Container, Col, Row, Nav, NavbarBrand, NavbarText} from "reactstrap";
import './Header.css';
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";

const Header  = (props) => {

    return (
            <Nav xs="12">
                <NavbarBrand xs="2">Logo</NavbarBrand>
                <Login baseURL={props.baseURL} setSessionToken={props.setSessionToken} />
                <Register baseURL={props.baseURL} setSessionToken={props.setSessionToken} />
                <Logout baseURL={props.baseURL} setSessionToken={props.setSessionToken} />
            </Nav>
    );
};

export default Header ;