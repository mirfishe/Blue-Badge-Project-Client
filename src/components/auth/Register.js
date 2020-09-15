import React, {useState} from "react";
import {Container, Col, Row, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Register = (props) => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errEmail, setErrEmail] = useState('');
    const [errPassword, setErrPassword] = useState('');

    const register = (event) => {
        event.preventDefault();

        if (email.length > 0) {

        } else {
            setErrEmail('Email is required.');
        };

        if (password.length > 0) {

        } else {
            setErrPassword('Password is required.');
        };

        let userObject = {
            email:  email,
            password:  password
        };
        // console.log(userObject);

        let URL = props.baseURL + "user/register";
        // console.log(URL);

        fetch(URL, {
            method: 'POST',
            headers:    new Headers ({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({user: userObject})
        })
        .then(res => res.json()) // {console.log(res); res.json();}
        .then(json => props.setSessionToken(json.sessionToken))// {props.setSessionToken(json.sessionToken); console.log('USER:', json); console.log(json.sessionToken);})
        .catch(err => console.log(err))

        // Since we’re not removing the whitespace from the email field’s value/input, you can put more than one entry into the database with the same email address. (I think.) I was able to enter multiple records with the same email address by entering “email@email.com” and “email@email.com ” unless I’m misunderstanding something. I expected a SequelizeUniqueConstraintError error.

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