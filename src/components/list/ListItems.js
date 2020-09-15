import React, {useState} from "react";
import {Container, Col, Row} from "reactstrap";

const ListItems = (props) => {

    return (
        <Row>
            <Col>List Items</Col>
        </Row>
    );
};

const deleteListItem = (listItem) => {
    fetch(`https://tw-blue-badge-server.herokuapp.com/list/item/delete/${item.id}`,{
        method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.token
        })
    })
    .then(() => listItem.fecthListItems())
}

<Button color="danger" onClick={() => {deleteListItem(listItem)}}>Delete</Button>

export default ListItems;

