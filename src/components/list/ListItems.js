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
        <div>
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
         {listItems.length > 0 ? listItems.map((item, index) => {
          return(
            <div className="listItems">
              <td><img src={item.imageURL} alt={item.itemName}/></td>
              {/* <td><a href={item.itemURL} target="_blank">{item.itemName}</a></td> */}
              {item ? <a href={item.itemURL} target="_blank">{item.itemName}</a> : <div>{item.itemName}</div>}
            </div>
          )
        }) : ""}
        </div>
        
    );
};
// notes 

export default ListItems;
