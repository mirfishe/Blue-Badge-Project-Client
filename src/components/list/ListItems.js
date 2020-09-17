import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Button, Table, Card, CardTitle, CardText, Grid} from "reactstrap";
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

    // useEffect(() => {
    //     console.log("ListItems.js props.sessionToken", props.sessionToken);
    //     // console.log("ListItems.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);

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
          <Row>
          {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
           {listItems.length > 0 ? listItems.map((item, index) => {
            return(
              <Card body className="text-center" id="listItems">
                <CardText>{item ? <a href={item.itemURL} target="_blank">{item.itemName}</a> : <p>{item.itemName}</p>} </CardText>
            <CardText>{item.imageURL ? <img src={item.imageURL} alt={item.itemName}/> : <img className="altImage" src={altImgURL} />}</CardText>
                <Button color="danger" size="sm"  onClick={() => {deleteListItem(item)}}>Delete</Button>
              </Card>
            )
          }) : <><img className="emptyItems" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" alt="Add Games"/>
          <p className="emptyItems">Add Games to your List to see them here.</p>
          </>
       }
          </Row>
    );
};

export default ListItems;
