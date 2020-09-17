import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button, Table} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {
    const [listItems, setListItems] = useState([]);

    const getListItems = () => {
        let url = props.baseURL + "list/" + props.activeList;
        console.log("ListItems.js url", url);

        fetch(url, {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": props.sessionToken,
          }),
        })
          .then(res => {
              
            console.log("ListItems.js response", res);
            return res.json();
          })
          .then((json) => {
            console.log("getListItem json", json);
            setListItems(json);
          })
          .catch((err) => console.log(err));
      };

      const deleteListItem = (item) => {
        fetch(`${props.baseURL}item/delete/${item.id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.sessionToken
          })
        })
        .then(() => getListItems())
      }

      const itemMapper = () => {
        return listItems.map((item, index) => {
          return(
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{item.itemURL}</td>
              <td>{item.imageURL}</td>
            </tr>
          )
        })
      }

    useEffect(() => {
        console.log("ListItems.js props.sessionToken", props.sessionToken);
        // console.log("ListItems.js localStorage token", localStorage.getItem("token"));
    }, [props.sessionToken]);

    useEffect(() => {
        console.log("ListItems.js props.activeList", props.activeList);
        getListItems();
    }, [props.activeList]);

    return (
        <Table>
          {/* {itemMapper()} */}
         {listItems.length > 0 ? listItems.map((item, index) => {
          return(
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{item.itemURL}</td>
              <td>{item.imageURL}</td>
              <td><a href={item.itemURL} target="_blank">{item.itemName}</a></td>
              <td><img src={item.imageURL} alt={item.itemName}/></td>
              <td>
              <Button color="danger" onClick={() => {deleteListItem(item)}}>Delete</Button>
              </td>
            </tr>
          )
        }) : ""}
        </Table>
        
    );
};
// notes 

export default ListItems;
