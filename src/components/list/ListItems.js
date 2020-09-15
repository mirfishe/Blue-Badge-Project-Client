import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {

    // const deleteListItem = (listItem) => {
    //     fetch(`${props.baseURL}list/item/delete/${item.id}`,{
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': props.sessionToken
    //         })
    //     })
    //     .then(() => listItem.fecthListItems())
    // }
    

    useEffect(() => {
        console.log("ListItem.js props.sessionToken", props.sessionToken);
    }, [props.sessionToken]);

    // return props.itemlist.map((itemlist, index) => {
    // return (
    //     <Row>
    //         <Col>List Items
    //         <tr>
    //         <td scope="row">{listitem.id}</td>
    //         <td>{listitem}</td>
    //         <td>{listitem}</td>
    //         <td>{listitem}</td>
    //         <td>{listitem}</td>
    //         {/* {button to move items?} */}
    //         {/* <Button color="danger" onClick={() => {deleteListItem(listItem)}}>Delete</Button> */}
    //         </tr>
    //         </Col>
    //     </Row>
    // );
    // })
};


export default ListItems;
