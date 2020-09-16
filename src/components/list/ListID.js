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
  Table,
} from "reactstrap";

const GetList = (props) => {
  const [listItem, setListItem] = useState([]);

  const getListItems = () => {
    let url = props.baseURL + "list/2";

    fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("getListItem json", json);
        setListItem(json);
      })
      .catch((err) => console.log(err));
  };

  const itemMapper = () => {
    return props.listItem.map((item, index) => {
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
    getListItems();
  }, []);

  return <Container>
    <Row>
      <Col md="9">
        <Table striped>
          <tbody>
          {itemMapper()}
          </tbody>
        </Table>
      </Col>
    </Row>
  </Container>;
};

export default GetList;
