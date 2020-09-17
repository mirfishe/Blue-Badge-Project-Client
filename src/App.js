import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {Container, Col, Row, Nav, NavbarBrand, NavbarText} from "reactstrap";
import Header from "./components/site/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Footer from "./components/site/Footer";
import Search from "./components/search/Search";
import List from "./components/list/List";
import API_URL from "./helpers/environment"

function App() {

  // const baseURL = "https://tw-blue-badge-server.herokuapp.com/";
  const baseURL = API_URL + "/";

  const [sessionToken, setSessionToken] = useState(undefined);
  const [activeList, setActiveList] = useState(0);
  const [listItemsUpdated, setListItemsUpdated] = useState(false);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     // setSessionToken(localStorage.getItem("token"));
  //     // console.log("App.js setSessionToken");
  //     console.log("App.js localStorage token", localStorage.getItem("token"));
  //     // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
  //   };
  // }, []);

  // const updateToken = (newToken) => {
  //   localStorage.setItem("token", newToken);
  //   // setSessionToken(newToken);
  //   console.log("App.js newToken", newToken);
  //   // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
  //   console.log("User token changed.");
  // };

  // const clearToken = () => {
  //   localStorage.clear();
  //   // setSessionToken("");
  //   console.log("App.js localStorage token", localStorage.getItem("token"));
  //   // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
  //   console.log("User logged out.");
  // };

  useEffect(() => {
    // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken

    if (sessionToken === null || sessionToken === undefined) {
      setActiveList(0);
      setListItemsUpdated(false);
      // console.log("App.js activeList", activeList);
      // console.log("App.js listItemsUpdated", listItemsUpdated);
    } else {
      setListItemsUpdated(true);
    };

  }, [sessionToken]);

  // useEffect(() => {
  //   console.log("App.js activeList", activeList);
  // }, [activeList]);

  // useEffect(() => {
  //   console.log("App.js listItemsUpdated", listItemsUpdated);
  // }, [listItemsUpdated]);

  return (
    <div>
      <Header baseURL={baseURL} sessionToken={sessionToken} setSessionToken={setSessionToken} />
<Container>
      <Row>
      <Col md="6">
      <Search baseURL={baseURL} sessionToken={sessionToken} activeList={activeList} setListItemsUpdated={setListItemsUpdated} />
      </Col>
      <Col md="6">
      {sessionToken !== null && sessionToken !== undefined ? <List baseURL={baseURL} sessionToken={sessionToken} activeList={activeList} setActiveList={setActiveList} listItemsUpdated={listItemsUpdated} setListItemsUpdated={setListItemsUpdated} /> : ""}
      </Col>
      </Row>
      </Container>
      <Container>
      <Row>
      <Col>
      NEED TO ADD SPACE HERE FOR THE FOOTER
      </Col>
      </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
