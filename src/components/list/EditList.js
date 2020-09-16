import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const EditList = (props) => {
    const [editListName, setEditListName] = useState(props.listToEdit.listName);
    const [isOpen, setIsOpen] = useState(true);

    const editOff = () => {
        props.setEditList(false);
    }

    const handleShow = () => {
        setIsOpen(false);
        editOff();
    }

    let url = `props.baseURL/list/update/${props.listToEdit.id}`;

    const updateList = (event) => {
        event.preventDefault();
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify({list: {title: editListName}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then((res) => {
            // need to add function to re-GET lists
            editOff();
            console.log(res);
        })
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Edit List</ModalHeader>
            <ModalBody>
                <Form onSubmit={updateList}>
                    <FormGroup>
                        <Label htmlFor="name">List Name:</Label>
                        <Input name="name" value={editListName} onChange={(e) => setEditListName(e.target.value)} />
                    </FormGroup>
                    <Button className="mr-3" color="primary" disabled={!editListName} type="submit">Add List</Button>
                    <Button outline color="secondary" onClick={handleShow}>Close</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default EditList;
