import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Button, Table} from "reactstrap";
import "./ListItems.css";

const ListItems = (props) => {
    const [listItems, setListItems] = useState([]);
    const [errForm, setErrForm] = useState("");
    const altImgURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/No_image_available_600_x_450.svg/1280px-No_image_available_600_x_450.svg.png";

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
            "Content-Type": "application/json",
            "Authorization": props.sessionToken,
          })
        })
        .then(() => getListItems())
        .catch(err => {
          console.log(err);
          setErrForm(err);
        })
    };

      // Commented out by Nick B. because it seems to cause a bug where list items disappear on initial login, after initial render
    // useEffect(() => {
    //     // console.log("ListItems.js props.sessionToken", props.sessionToken);
    //     // console.log("ListItems.js localStorage token", localStorage.getItem("token"));
    //     getListItems();
    // }, [props.sessionToken]);

    useEffect(() => {
      console.log("ListItems.js props.activeList", props.activeList);
      getListItems();
  }, [props.activeList]);

    useEffect(() => {
      console.log("ListItems.js props.listItemsUpdated", props.listItemsUpdated);
      getListItems();
      props.setListItemsUpdated(false);
  }, [props.listItemsUpdated]);

    return (
        <Table>
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
         {listItems.length > 0 ? listItems.map((item, index) => {
          return(
            <tr className="listItems">
              <td>{item ? <a href={item.itemURL} target="_blank">{item.itemName}</a> : <p>{item.itemName}</p>} </td>
          <td>{item.imageURL ? <img src={item.imageURL} alt={item.itemName}/> : <img className="altImage" src={altImgURL} />}</td>
              <td>
              <Button color="danger" size="sm" onClick={() => {deleteListItem(item)}}>Delete</Button>
              </td>
            </tr>
          )
        }) : ""}
        </Table>
        
    );
};

export default ListItems;
