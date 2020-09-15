import React, {useState} from "react";
import {Container, Col, Row, Form, Button, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter} from "reactstrap";

const Login = (props) => {


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = (event) => {
        event.preventDefault();

    };

    return (
        <div>
        <Button color="secondary" onClick={toggle}>Log In</Button>
        <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Log In</ModalHeader>
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
            <Button type="submit" color="primary" onClick={toggle}>Log In</Button>
        </ModalFooter>
        </Modal>
        </div>
    );
};

export default Login;