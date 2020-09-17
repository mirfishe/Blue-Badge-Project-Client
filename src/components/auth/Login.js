import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Login = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => {
        
        setEmail("");
        setPassword("");

        setErrEmail("");
        setErrPassword("");
        setErrForm("");

        setModal(!modal);
    };

    // useEffect(() => {
    //     console.log("Login.js modal", modal);
    // }, [modal]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errForm, setErrForm] = useState("");

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          {logIn(e)};
        }
      };

    const logIn = (event) => {
        event.preventDefault();

        setErrForm("");

        let emailValidated = false;
        let passwordValidated = false;
        let formValidated = false;

        const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.match(emailFormat) && email.length > 0) {
            emailValidated = true;
            setErrEmail("");
            // console.log("Register.js Valid Email Address");
            // console.log("Register.js emailValidated true", emailValidated);
        } else {
            emailValidated = false;
            setErrEmail("Please enter a valid email address.");
            // console.log("Register.js Invalid Email Address");
            // console.log("Register.js emailValidated false", emailValidated);
        };

        if (password.length > 4) {
            passwordValidated = true;
            setErrPassword("");
            // console.log("Register.js Valid Password");
            // console.log("Register.js passwordValidated true", passwordValidated);
        } else {
            passwordValidated = false;
            setErrPassword("Password must be at least 5 characters.");
            // console.log("Register.js Invalid Password");
            // console.log("Register.js passwordValidated false", passwordValidated);
        };

        if (emailValidated && passwordValidated) {
            formValidated = true;
            // console.log("Register.js Valid Form");
            // console.log("Register.js formValidated true", formValidated);
        } else {
            formValidated = false;
            // console.log("Register.js Invalid Form");
            // console.log("Register.js formValidated false", formValidated);
        };

        // console.log("Register.js emailValidated", emailValidated);
        // console.log("Register.js passwordValidated", passwordValidated);
        // console.log("Register.js formValidated", formValidated);

        if (formValidated) {

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
            .then(res => {

                console.log("Login.js response", res);
                console.log("Login.js response.status", res.status);
                console.log("Login.js response.statusText", res.statusText);

                if (res.status === 200) {
                    return res.json();
                } else {
                    return res.status;
                };

            })
            .then(json => {

                if (json !== 500 && json !== 401) {
                    props.setSessionToken(json.sessionToken);
                    console.log("Login.js USER", json);
                    console.log("Login.js json.sessionToken", json.sessionToken);
                    toggle();
                } else {
                    console.log("Login.js ERROR", json);
                    setErrForm("Login failed.");
                };

            })
            .catch(err => console.log(err))

        };
    };

    useEffect(() => {
        console.log("Login.js props.sessionToken", props.sessionToken);
        // console.log("Login.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

    return (
        <div className="m-2">
        <Button color="success" size="sm" onClick={toggle}>Log In</Button>
        <Modal isOpen={modal} toggle={toggle} onKeyDown={onKeyDown}>
        <ModalHeader>Log In</ModalHeader>
        <ModalBody>
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
        <Form onSubmit={logIn}>
            <FormGroup>
                <Label for="txtEmail">Email Address</Label>
                <Input type="text" id="txtEmail" placeholder="Email Address" value={email} onChange={(e) => {/*console.log(e.target.value); */setEmail(e.target.value);}} />
                {errEmail !== "" ? <Alert color="danger">{errEmail}</Alert> : ""}
            </FormGroup>
            <FormGroup>
                <Label for="txtPassword">Password</Label>
                <Input type="password" id="password" placeholder="Password" value={password} onChange={(e) => {/*console.log(e.target.value); */setPassword(e.target.value);}} />
                {errPassword !== "" ? <Alert color="danger">{errPassword}</Alert> : ""}
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