import React, {useState, useEffect} from "react";
import {Alert, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const CreateList = (props) => {
    const [listName, setListName] = useState('');
    const [errForm, setErrForm] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const addOff = () => {
        props.setAddList(false);
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          {newList(e)};
        }
      };

    let url = props.baseURL + 'list/add';

    const newList = (event) => {
        event.preventDefault();
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({list: {title: listName}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then((res) => {
            props.reGetList();
        })
        .then(
            addOff()
        )
        .catch(err => {
            console.log(err);
            setErrForm(err);
        })
    };

    const handleShow = () => {
        setIsOpen(false);
        addOff();
    };

    // useEffect(() => {
    //     console.log("CreateList.js props.sessionToken", props.sessionToken);
    //     // console.log("CreateList.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);

    return (
        <Modal isOpen={isOpen} onKeyDown={onKeyDown}>
            <ModalHeader>Create New List</ModalHeader>
            <ModalBody>
                {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
                <Form onSubmit={newList}>
                    <FormGroup>
                        <Label htmlFor="name">List Name:</Label>
                        <Input name="name" value={listName} onChange={(e) => setListName(e.target.value)} />
                    </FormGroup>
                    <Button className="mr-3" color="primary" disabled={!listName} type="submit">Add List</Button>
                    <Button outline color="secondary" onClick={handleShow}>Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CreateList;
