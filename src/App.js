import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {Container, Col, Row, Nav, NavbarBrand, NavbarText} from "reactstrap";
// import Header from "./components/site/Header";
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
      console.log("App.js localStorage token", localStorage.getItem("token"));
      // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
    };
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log("App.js newToken", newToken);
    // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
    console.log("User token changed.");
  };

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    console.log("App.js localStorage token", localStorage.getItem("token"));
    // console.log("App.js sessionToken", sessionToken); // Never shows the current value of sessionToken
    console.log("User logged out.");
  };

  return (
    <Container>
      <Row>
      {/* <Header baseURL={baseURL} sessionToken={sessionToken} updateToken={updateToken} clearToken={clearToken} /> */}
        <Nav>
            <NavbarBrand>Logo</NavbarBrand>
            {localStorage.getItem("token") === null || localStorage.getItem("token") === undefined  ? <Login baseURL={baseURL} updateToken={updateToken} />  : ""}
            {localStorage.getItem("token") === null || localStorage.getItem("token") === undefined  ? <Register baseURL={baseURL} updateToken={updateToken} /> : ""}
            {localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined  ? <Logout clearToken={clearToken} />  : ""}
        </Nav>
      </Row>
      <Row className="mp-3">
      <Col md="6">
      <Search baseURL={baseURL} sessionToken={sessionToken} activeList={activeList} />
      </Col>
      <Col md="6">
      <List baseURL={baseURL} sessionToken={sessionToken} activeList={activeList} setActiveList={setActiveList} />
      </Col>
      </Row>
      <Row>
      <Footer />
      </Row>
    </Container>
  );
};

export default App;
