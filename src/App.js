import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {Container, Col, Row} from "reactstrap";
import Header from "./components/site/Header";
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

  return (
    <Container>
      <Row>
        <Header baseURL={baseURL} sessionToken={sessionToken} updateToken={updateToken} clearToken={clearToken} />
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
