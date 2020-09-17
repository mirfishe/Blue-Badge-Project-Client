import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Button, Table} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {
    const [listItems, setListItems] = useState([]);
    const [errForm, setErrForm] = useState("");

    const getListItems = () => {
        let url = props.baseURL + "list/" + props.activeList;
        // console.log("ListItems.js url", url);

        fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": props.sessionToken,
          }),
        })
          .then(res => {
            // console.log("ListItems.js response", res);
            return res.json();
          })
          .then((json) => {
            // console.log("getListItem json", json);
            setListItems(json);
          })
          .catch(err => {
            console.log(err);
            setErrForm(err);
        })
      };

      const deleteListItem = (item) => {
        fetch(`${props.baseURL}item/delete/${item.id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.sessionToken
          })
        .then(() => getListItems())
        .catch(err => {
          console.log(err);
          setErrForm(err);
      })
      };

    useEffect(() => {
        // console.log("ListItems.js props.sessionToken", props.sessionToken);
        // console.log("ListItems.js localStorage token", localStorage.getItem("token"));
        getListItems();
    }, [props.sessionToken]);

    useEffect(() => {
      // console.log("ListItems.js props.activeList", props.activeList);
      getListItems();
  }, [props.activeList]);

    useEffect(() => {
      // console.log("ListItems.js props.listItemsUpdated", props.listItemsUpdated);
      getListItems();
      props.setListItemsUpdated(false);
  }, [props.listItemsUpdated]);

    return (
        <Table>
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
         {listItems.length > 0 ? listItems.map((item, index) => {
          return(
            <tr key={index}>
              <td><img src={item.imageURL} alt={item.itemName}/></td>
              <td><a href={item.itemURL} target="_blank">{item.itemName}</a></td>
              <td>
              <Button color="danger" size="sm" onClick={() => {deleteListItem(item)}}>Delete</Button>
              <td>
              <Button color="danger" onClick={() => {deleteListItem(item)}}>Delete</Button>
              </td>
            </tr>
          )
        }) : ""}
        </Table>
        
    );
};

export default ListItems;
