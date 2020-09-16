import React, {useState, useEffect} from "react";
import {Container, Col, Row, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Login = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {

        setModal(!modal);
    };

    useEffect(() => {
        console.log("Login.js modal", modal);
    }, [modal]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logIn = (event) => {
        event.preventDefault();

            let userObject = {
                email:  email.trim(),
                password:  password.trim()
            };
            // console.log("Login.js userObject", userObject);

            let URL = props.baseURL + "user/login";
            // console.log("Login.js URL", URL);

            fetch(URL, {
                method: "POST",
                headers:    new Headers ({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({user: userObject})
            })
            .then(res => res.json()) // {console.log("Login.js response", res); res.json();}

            // If not unauthorized, then set the session token
            // Then toggle
            // Else display error authenication failed
            // .then(json => props.updateToken(json.sessionToken)) // console.log("Login.js USER", json); console.log("Login.js json.sessionToken)", json.sessionToken);})
            // .then(json => props.updateToken(json.sessionToken)) // console.log("Login.js USER", json); console.log("Login.js json.sessionToken)", json.sessionToken);})
            .then(json => props.setSessionToken(json.sessionToken)) // console.log("Login.js USER", json); console.log("Login.js json.sessionToken)", json.sessionToken);})
            .then(toggle())
            .catch(err => console.log(err))

    };

    useEffect(() => {
        console.log("Login.js props.sessionToken", props.sessionToken);
        // console.log("Login.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

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
            </FormGroup>
            <FormGroup>
                <Label for="txtPassword">Password</Label>
                <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {/*console.log(e.target.value); */setPassword(e.target.value);}} />
            </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
            <Button type="submit" color="primary" onClick={logIn}>Log In</Button>
            <Button outline type="submit" color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>
        </div>
    );
};

export default Login;