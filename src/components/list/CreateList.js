import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const CreateList = (props) => {
    const [listName, setListName] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const addOff = () => {
        props.setAddList(false);
    }

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
            // need to add function to re-GET lists
            addOff();
            console.log(res);
        })
    }

    const handleShow = () => {
        setIsOpen(false);
        addOff();
    }
    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Create New List</ModalHeader>
            <ModalBody>
                <Form onSubmit={newList}>
                    <FormGroup>
                        <Label htmlFor="name">List Name:</Label>
                        <Input name="name" value={listName} onChange={(e) => setListName(e.target.value)} />
                    </FormGroup>
                    <Button className="mr-3" color="primary" disabled={!listName} type="submit">Add List</Button>
                    <Button outline color="secondary" onClick={handleShow}>Close</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default CreateList;
