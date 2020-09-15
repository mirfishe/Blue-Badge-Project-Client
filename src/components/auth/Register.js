import React, {useState} from "react";
import {Container, Col, Row, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Register = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {

        // Causes issues with the fetch?
        // setEmail("");
        // setPassword("");

        if (modal) {
            // Removes the error messages after the fetch if successful or not
            // setErrEmail("");
            // setErrPassword("");
        };
        
        setModal(!modal);
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [formValidated, setFormValidated] = useState(false);
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");

    const register = (event) => {
        event.preventDefault();

        if (email.length > 0) {
            setFormValidated(true);
        } else {
            setFormValidated(false);
            setErrEmail("Email is required.");
        };

        if (password.length > 0) {
            setFormValidated(true);
        } else {
            setFormValidated(false);
            setErrPassword("Password is required.");
        };

        let userObject = {
            email:  email.trim(),
            password:  password.trim()
        };
        // console.log("Register.js userObject", userObject);

        let URL = props.baseURL + "user/register";
            // console.log("Register.js URL", URL);

        fetch(URL, {
            method: "POST",
            headers:    new Headers ({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({user: userObject})
        })
        .then(res => res.json()) // {console.log("Register.js response", res); res.json();}
        .then(json => props.updateToken(json.sessionToken)) // {props.setSessionToken(json.sessionToken); console.log("Register.js USER", json); console.log("Register.js json.sessionToken", json.sessionToken);})
        .catch(err => console.log(err))

        toggle();

    };

    return (
        <div className="m-2">
        <Button color="secondary" size="sm" onClick={toggle}>Register</Button>
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader>Register</ModalHeader>
        <ModalBody>
        <Form onSubmit={register}>
            <FormGroup>
                <Label for="txtEmail">Email Address</Label>
                <Input type="text" id="txtEmail" placeholder="Email Address" value={email} onChange={(e) => {/*console.log(e.target.value); */setEmail(e.target.value);}} />
                {errEmail} 
            </FormGroup>
            <FormGroup>
                <Label for="txtPassword">Password</Label>
                <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {/*console.log(e.target.value); */setPassword(e.target.value);}} />
                {errPassword}
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
            <Button type="submit" color="primary" onClick={register}>Register</Button>
            <Button type="submit" color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
        </div>
    );
};

export default Register;