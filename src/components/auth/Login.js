import React, {useState} from "react";
import {Container, Col, Row, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Login = (props) => {

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

    // If the user sees the login button and then trys to login without any form data, somehow they still get logged in? From localstorage?
    const logIn = (event) => {
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

        // if (formValidated) {
            let userObject = {
                email:  email.trim(),
                password:  password.trim()
            };
            // console.log(userObject);

            let URL = props.baseURL + "user/login";
            // console.log(URL);

            fetch(URL, {
                method: "POST",
                headers:    new Headers ({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({user: userObject})
            })
            .then(res => res.json()) // {console.log(res); res.json();}
            .then(json => props.updateToken(json.sessionToken))// console.log("USER:", json); console.log(json.sessionToken);})
            // .then(toggle())
            .catch(err => console.log(err))

            // if (props.sessionToken) {
                toggle();
            // };

        // };
    };



    return (
        <div className="m-2">
        <Button color="success" size="sm" onClick={toggle}>Log In</Button>
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader>Log In</ModalHeader>
        <ModalBody>
        <Form onSubmit={logIn}>
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
            <Button type="submit" color="primary" onClick={logIn}>Log In</Button>
            <Button type="submit" color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
        </div>
    );
};

export default Login;