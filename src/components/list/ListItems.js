import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button, Table} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {
    const [listItem, setListItem] = useState([]);

    const getListItems = () => {
        let url = props.baseURL + "list/2";
    
        fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": props.sessionToken,
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("getListItem json", json);
            setListItem(json);
          })
          .catch((err) => console.log(err));
      };

      useEffect(() => {
          getListItems()
      }, [])

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
            {/* {getListItems()} */}
            {/* <Button color="danger" onClick={() => {deleteListItem(listItem)}}>Delete</Button> */}
            </Col>
        </Row>
        
    );
};


export default ListItems;
