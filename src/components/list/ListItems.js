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

<<<<<<< HEAD
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
=======
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
>>>>>>> 643572ac017fee4cf30de69436a3e3c017cb1c0e
};


export default ListItems;
