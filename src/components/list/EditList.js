import React, {useState, useEffect} from "react";
import {Alert, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const EditList = (props) => {
    const [editListName, setEditListName] = useState("");
    const [errForm, setErrForm] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const editOff = () => {
        props.setEditList(false);
    }

    const handleShow = () => {
        setIsOpen(false);
        editOff();
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          {updateList(e)};
        }
      };

    let url = `${props.baseURL}list/update/${props.activeList}`;

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
            props.reGetList();
            editOff();
            // console.log(res);
        })
        .catch(err => {
            console.log(err);
            setErrForm(err);
        })
    }

    // useEffect(() => {
    //     console.log("DeleteList.js props.sessionToken", props.sessionToken);
    //     // console.log("DeleteList.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);
    
    return (
        <Modal isOpen={isOpen} onKeyDown={onKeyDown}>
            <ModalHeader>Edit List</ModalHeader>
            <ModalBody>
                {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
                <Form onSubmit={updateList}>
                    <FormGroup>
                        <Label htmlFor="name">New List Name:</Label>
                        <Input name="name" value={editListName} onChange={(e) => setEditListName(e.target.value)} />
                    </FormGroup>
                    <Button className="mr-3" color="primary" disabled={!editListName} type="submit">Edit List</Button>
                    <Button outline color="secondary" onClick={handleShow}>Close</Button>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default EditList;
