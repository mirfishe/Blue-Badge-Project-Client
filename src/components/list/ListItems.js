import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button, Table} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {
    const [listItems, setListItems] = useState([]);

    const getListItems = () => {
        let url = props.baseURL + "list/" + props.activeList;
      console.log("url log", url)
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
            setListItems(json);
          })
          .catch((err) => console.log(err));
      };

      const deleteListItem = (item) => {
        fetch(`url${item.id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': props.sessionToken
          })
        })
        .then(() => props.getListItems())
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
        <Table>
          {/* {itemMapper()} */}
         {listItems.map((item, index) => {
          return(
            <tr key={index}>
              <td>{item.itemName}</td>
              <td>{item.itemURL}</td>
              <td>{item.imageURL}</td>
                <td>
                {getListItems()}
                <Button color="danger" onClick={() => {deleteListItem(item)}}>Delete</Button>
                </td>
            </tr>
          )
        })}
        </Table>
        
    );
};
// notes 

export default ListItems;
