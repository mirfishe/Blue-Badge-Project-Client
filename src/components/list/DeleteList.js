import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const DeleteList = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const deleteOff = () => {
        props.setDeleteList(false);
    }

    const handleShow = () => {
        setIsOpen(false);
        deleteOff();
    }

    let url = `props.baseURL/list/delete/${props.listToDelete.id}`;

    const deleteList = (event) => {
        event.preventDefault();
        fetch(url, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then((res) => {
            // need to add function to re-GET lists
            deleteOff();
            console.log(res);
        })
    }

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Are you sure you would like to delete list?</ModalHeader>
            <ModalBody>
                    <Button onClick={deleteList} type="submit">Confirm Delete</Button>
                    <Button onClick={handleShow}>Close</Button>
            </ModalBody>
        </Modal>
    )
}

export default DeleteList;
