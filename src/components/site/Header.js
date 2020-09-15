import React, {useState} from "react";
import {Container, Col, Row, Nav, NavbarBrand, NavbarText} from "reactstrap";
import "./Header.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Logout from "../auth/Logout";

const Header  = (props) => {

    return (
            <Nav xs="12">
                <NavbarBrand xs="2">Logo</NavbarBrand>
                {props.sessionToken !== localStorage.getItem("token") ? <Login baseURL={props.baseURL} updateToken={props.updateToken} /> : ""}
                {props.sessionToken !== localStorage.getItem("token") ? <Register baseURL={props.baseURL} updateToken={props.updateToken} /> : ""}
                {props.sessionToken === localStorage.getItem("token") && props.sessionToken !== undefined ? <Logout clearToken={props.clearToken} /> : ""}
            </Nav>
    );
};

export default Header ;