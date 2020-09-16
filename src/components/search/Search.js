import React, {useState, useEffect} from "react";
import {Container, Col, Row, Form, FormGroup, Button, Input} from "reactstrap";
import "./Search.css";
import Results from "./Results";

const Search = (props) => {

    const [searchTerms, setSearchTerms] = useState("");
    const [results, setResults] = useState([]);

    const [errSearchTerms, setErrSearchTerms] = useState("");

    const searchGames = () => {

            let URL = props.baseURL + "igdb";
            // console.log("Search.js URL", URL);

            let searchCriteriaObject = {
                searchTerms:  searchTerms.trim()
            };
            // console.log("Search.js userObject", searchCriteriaObject);

            fetch(URL, {
                method: "POST",
                headers:    new Headers ({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({searchCriteria: searchCriteriaObject})
            })
            .then(res => res.json()) // {console.log("Search.js response", res); res.json();}
            .then(json => setResults(json)) // {setResults(json); console.log("Search.js results", json);})
            .catch(err => console.log(err))

    };

    const frmSearchGames = (event) => {
        event.preventDefault();

        setErrSearchTerms("");

        if (searchTerms.length > 0) {
            searchGames();
        } else {
            setErrSearchTerms("Please enter search terms.");
        };

    };

    const newSearch = (event) => {
        event.preventDefault();

        setResults([]);
        setSearchTerms("");
        setErrSearchTerms("");

    };

    useEffect(() => {
        console.log("Search.js props.sessionToken", props.sessionToken);
        // console.log("Search.js localStorage token", localStorage.getItem("token"));
        setResults([]);
        searchGames();
        // setSearchTerms([]);
    }, [props.sessionToken]);

    useEffect(() => {
        console.log("Search.js activeList", props.activeList);
    }, [props.activeList]);

    return (
        <Container className="m-3">
        <Row className="m-3">
        <Form onSubmit={frmSearchGames}>
        <FormGroup>
        <Input type="text" id="searchTerms" placeholder="Search Terms" value={searchTerms} onChange={(e) => {/*console.log(e.target.value); */setSearchTerms(e.target.value);}} />
        {errSearchTerms} 
        </FormGroup>
        <Button type="submit" color="primary">Search</Button>
        <Button type="submit" outline color="secondary" onClick={newSearch}> New Search</Button>
        </Form>
        </Row>
        <Row>
            {results.length > 0 ? results.map(game => <Results game={game.game} baseURL={props.baseURL} activeList={props.activeList} sessionToken={props.sessionToken} />) : ""}
        </Row>
        </Container>
    );
};

export default Search;