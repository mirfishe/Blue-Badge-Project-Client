import React, {useState, useEffect} from "react";
import {Container, Col, Row, Form, FormGroup, Button, Input} from "reactstrap";
import "./Search.css";
import Results from "./Results";

const Search = (props) => {

    const [searchTerms, setSearchTerms] = useState("");
    const [results, setResults] = useState([]);

    const [errSearchTerms, setErrSearchTerms] = useState("");

    const searchGames = (event) => {
        event.preventDefault();

        if (searchTerms.length > 0) {

            setErrSearchTerms("");

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

        } else {
            setErrSearchTerms("Please enter search terms.");
        };


    };

    useEffect(() => {
        console.log("Search.js results", results);
    }, [results]);

    useEffect(() => {
        console.log("Search.js props.sessionToken", props.sessionToken);
    }, [props.sessionToken]);

    return (
        <Container className="m-3">
        <Row className="m-3">
        <Form onSubmit={searchGames}>
        <FormGroup>
        <Input type="text" id="searchTerms" placeholder="Search Terms" value={searchTerms} onChange={(e) => {/*console.log(e.target.value); */setSearchTerms(e.target.value);}} />
        {errSearchTerms} 
        </FormGroup>
        <Button type="submit" color="primary">Search</Button>
        </Form>
        </Row>
        <Row>
            {results.length > 0 ? results.map(game => <Results game={game.game} />) : ""}
        </Row>
        </Container>
    );
};

export default Search;