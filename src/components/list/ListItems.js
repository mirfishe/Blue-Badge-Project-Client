import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {

    const deleteListItem = (listItem) => {
        fetch(`${props.baseURL}list/item/delete/${listItem.id}`,{
                method: 'DELETE',
                headers:    new Headers ({
                    'Content-Type': 'application/json',
                    "Authorization": props.sessionToken
                })
            })
            .then(res => res.json())
            // .then(() => ) // re-fetch list items
            .catch(err => console.log(err))
    };

    useEffect(() => {
        console.log("ListItems.js props.sessionToken", props.sessionToken);
        // console.log("ListItems.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

    useEffect(() => {
        console.log("ListItems.js props.activeList", props.activeList);
    }, [props.activeList]);

    return (
        <Row>
            <Col>List Items
            {/* <Button color="danger" onClick={() => {deleteListItem(listItem)}}>Delete</Button> */}
            </Col>
        </Row>
    );
};


export default ListItems;
