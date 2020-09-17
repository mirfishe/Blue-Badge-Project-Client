import React, {useState, useEffect} from "react";
import {Alert, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const DeleteList = (props) => {
    const [errForm, setErrForm] = useState("");
    const [isOpen, setIsOpen] = useState(true);

    const deleteOff = () => {
        props.setDeleteList(false);
    };

    const handleShow = () => {
        setIsOpen(false);
        deleteOff();
    };

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
        .catch(err => {
            console.log(err);
            setErrForm(err);
        })
    };

    // useEffect(() => {
    //     console.log("DeleteList.js props.sessionToken", props.sessionToken);
    //     // console.log("DeleteList.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);

    return (
        <Modal isOpen={isOpen}>
            <ModalHeader>Are you sure you would like to delete list?</ModalHeader>
            <ModalBody>
                    {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
                    <Button className="mr-3" color="danger" onClick={deleteList} type="submit">Confirm Delete</Button>
                    <Button outline color="secondary" onClick={handleShow}>Close</Button>
            </ModalBody>
        </Modal>
    )
}

export default DeleteList;
