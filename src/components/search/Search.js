import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Form, FormGroup, Button, Input} from "reactstrap";
import "./Search.css";
import Results from "./Results";

const Search = (props) => {

    const [searchTerms, setSearchTerms] = useState("");
    const [results, setResults] = useState([]);

    const [errSearchTerms, setErrSearchTerms] = useState("");
    const [errForm, setErrForm] = useState("");

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          {frmSearchGames(e)};
        }
      };

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
            .catch(err => {
                console.log(err);
                setErrForm(err);
            })

    };

    const frmSearchGames = (e) => {
        e.preventDefault();

        setErrSearchTerms("");

        if (searchTerms.length > 0) {
            searchGames();
        } else {
            setErrSearchTerms("Please enter a search.");
        };

    };

    const newSearch = (e) => {
        e.preventDefault();

        setResults([]);
        setSearchTerms("");
        setErrSearchTerms("");

    };

    useEffect(() => {
        // console.log("Search.js props.sessionToken", props.sessionToken);
        // console.log("Search.js localStorage token", localStorage.getItem("token"));
        setResults([]);
        searchGames();
        // setSearchTerms([]);
    }, [props.sessionToken]);

    // useEffect(() => {
    //     console.log("Search.js results", results);
    // }, [results]);

    // useEffect(() => {
    //     console.log("Search.js activeList", props.activeList);
    // }, [props.activeList]);

    return (
        <Container className="m-3">
        <Row className="m-3">
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
        <Form onSubmit={frmSearchGames} onKeyDown={onKeyDown}>
        <FormGroup>
        <Input type="text" id="searchTerms" placeholder="Search Terms" value={searchTerms} onChange={(e) => {/*console.log(e.target.value); */setSearchTerms(e.target.value);}} />
        {errSearchTerms !== "" ? <Alert color="danger">{errSearchTerms}</Alert> : ""}
        </FormGroup>
        <Button type="submit" color="primary" className="mr-2">Search</Button>
        <Button type="submit" outline color="secondary" className="mr-2" onClick={newSearch}> Clear Results</Button>
        </Form>
        </Row>
        <Row>
            {results.length > 0 ? results.map(game => <Results game={game.game} baseURL={props.baseURL} activeList={props.activeList}  setListItemsUpdated={props.setListItemsUpdated} sessionToken={props.sessionToken} />) : ""}
        </Row>
        </Container>
    );
};

export default Search;