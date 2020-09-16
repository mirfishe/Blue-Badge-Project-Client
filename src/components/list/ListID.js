import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

const GetList = (props) => {
  const [lists, setLists] = useState([]);
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
  return (
      <div>Testing {getListItems()}</div>
  )
};

export default GetList;