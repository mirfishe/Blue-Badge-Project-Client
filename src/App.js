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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      console.log("App.js localStorage token", localStorage.getItem("token"));
      // console.log("sessionToken", sessionToken); // Never shows the current value of sessionToken
    };
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log("App.js newToken", newToken);
    // console.log("sessionToken", sessionToken); // Never shows the current value of sessionToken
    console.log("User logged in.");
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    console.log("App.js localStorage token", localStorage.getItem("token"));
    // console.log("sessionToken", sessionToken); // Never shows the current value of sessionToken
    console.log("User logged out.");
  };

  // Didn't work to re-render the Header.
  // useEffect(() => {
  //   displayHeader();
  // }, [sessionToken]);

  // Didn't work to re-render the Header.
  // const displayHeader = () => {
  //   return (
  //     <Row>
  //     <Header baseURL={baseURL} sessionToken={sessionToken} updateToken={updateToken} clearToken={clearToken} />
  //   </Row>
  //   )};

  return (
    <Container>
      {/* displayHeader() */ /* Didn't work to re-render the Header. */}
      <Row>
      {/* <Header baseURL={baseURL} sessionToken={sessionToken} updateToken={updateToken} clearToken={clearToken} /> */}
        <Nav>
            <NavbarBrand>Logo</NavbarBrand>
            {/* {sessionToken !== localStorage.getItem("token") ? <Login baseURL={baseURL} updateToken={updateToken} /> : ""}
            {sessionToken !== localStorage.getItem("token") ? <Register baseURL={baseURL} updateToken={updateToken} /> : ""}
            {sessionToken === localStorage.getItem("token") && sessionToken !== undefined ? <Logout clearToken={clearToken} /> : ""} */}
            {localStorage.getItem("token") === null || localStorage.getItem("token") === undefined  ? <Login baseURL={baseURL} updateToken={updateToken} />  : ""}
            {localStorage.getItem("token") === null || localStorage.getItem("token") === undefined  ? <Register baseURL={baseURL} updateToken={updateToken} /> : ""}
            {localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined  ? <Logout clearToken={clearToken} />  : ""}
        </Nav>
      </Row>
      <Row className="mp-3">
      <Col xs="4">
      <Search baseURL={baseURL} sessionToken={sessionToken} />
      </Col>
      <Col xs="4">
      <List baseURL={baseURL} sessionToken={sessionToken} />
      </Col>
      </Row>
      <Row>
      <Footer />
      </Row>
    </Container>
  );
}

export default App;
