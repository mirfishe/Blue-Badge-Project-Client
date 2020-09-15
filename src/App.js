import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {Container, Col, Row} from "reactstrap";
import Header from "./components/site/Header";
import Footer from "./components/site/Footer";
import Search from "./components/search/Search";
import List from "./components/list/List";


function App() {

const baseURL = "https://tw-blue-badge-server.herokuapp.com/";

  return (
    <Container>
      <Row>
        <Header baseURL={baseURL} />
      </Row>
      <Row m-3>
      <Col xs="4">
      <Search baseURL={baseURL} />
      </Col>
      <Col xs="4">
      <List baseURL={baseURL} />
      </Col>
      </Row>
      <Row>
      <Footer />
      </Row>
    </Container>
  );
}

export default App;
