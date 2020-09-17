import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Form, FormGroup, Button, Input} from "reactstrap";
import "./Search.css";
import Results from "./Results";

const Search = (props) => {

    const [searchTerms, setSearchTerms] = useState("");
    const [pageNumber, setPageNumber,] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [results, setResults] = useState([]);

    const [errSearchTerms, setErrSearchTerms] = useState("");
    const [errForm, setErrForm] = useState("");

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
          {frmSearchGames(e)};
        }
      };

    const searchGames = () => {

            let URL = props.baseURL + "search";
            // console.log("Search.js URL", URL);

            let searchCriteriaObject = {
                searchTerms:  searchTerms.trim(),
                limit:  limit,
                offset: offset
            };
            // console.log("Search.js userObject", searchCriteriaObject);

            fetch(URL, {
                method: "POST",
                headers:    new Headers ({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({searchCriteria: searchCriteriaObject})
            })
            .then(res => {

                // console.log("Search.js response", res);
                // console.log("Search.js response.status", res.status);
                // console.log("Search.js response.statusText", res.statusText);

                if (res.status === 200) {
                    return res.json();
                } else {
                    return res.status;
                };

            })
            .then(json => {
                // console.log("Search.js results", json);
                setResults(json);
            })
            .catch(err => {
                console.log(err);
                setErrForm(err);
            })

    };

    const frmSearchGames = (e) => {
        e.preventDefault();

        setErrSearchTerms("");

        if (searchTerms.trim().length > 0) {
            searchGames();
        } else {
            setErrSearchTerms("Please enter search.");
        };

    };

    const newSearch = () => {

        setResults([]);
        setSearchTerms("");
        setErrSearchTerms("");

    };

    const changePageNumber = (direction) => {
        if (direction === 'down') {
          if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
          };
        };
        if (direction === 'up') {
          setPageNumber(pageNumber + 1);
        };
    };

      useEffect(() => {
        // console.log("Search.js pageNumber", pageNumber);
        setOffset(pageNumber * limit);
    }, [pageNumber]);

    useEffect(() => {
        // console.log("Search.js offset", offset);

        if (searchTerms.trim().length > 0) {
            searchGames();
            // Moves the page to the top
            window.scrollTo(0, 0);
        };

    }, [offset]);

    useEffect(() => {
        // console.log("Search.js props.sessionToken", props.sessionToken);
        // console.log("Search.js localStorage token", localStorage.getItem("token"));
        if (props.sessionToken !== null && props.sessionToken !== undefined && searchTerms.trim().length > 0) {
            setResults([]);
            searchGames();
        };
        // setSearchTerms([]);
    }, [props.sessionToken]);

    // useEffect(() => {
    //     console.log("Search.js results", results);
    // }, [results]);

    // useEffect(() => {
    //     console.log("Search.js activeList", props.activeList);
    // }, [props.activeList]);

    return (
        <Container>
        <Row>
        <Col>
        {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
        <Form onSubmit={frmSearchGames} onKeyDown={onKeyDown}>
        <FormGroup>
        {errSearchTerms !== "" ? <Alert color="danger">{errSearchTerms}</Alert> : ""}
        <Input type="text" id="searchTerms" placeholder="Search Terms" value={searchTerms} onChange={(e) => {/*console.log(e.target.value); */setSearchTerms(e.target.value);}} />
        </FormGroup>
        <Button type="submit" color="primary" className="mr-2">Search</Button>
        <Button outline color="secondary" className="mr-2" onClick={newSearch}>Clear Results</Button>
        </Form>
        </Col>
        </Row>
        <Row>
            {results.length > 0 ? results.map(game => <Results game={game.game} baseURL={props.baseURL} activeList={props.activeList}  setListItemsUpdated={props.setListItemsUpdated} sessionToken={props.sessionToken} />) : ""}
        </Row>
        {results.length > 0 ? 
        <Row>
            <Col xs="2" className="col-auto mr-auto">
            {pageNumber > 0 ? <Button color="info" onClick={(e) => {/*console.log(e.target.value); */ changePageNumber("down");}}>Previous</Button> : ""}
            </Col>
            <Col xs="2" className="col-auto">
                <Button color="info" onClick={(e) => {/*console.log(e.target.value); */ changePageNumber("up");}}>Next</Button>
            </Col>
        </Row>
        : ""}
        </Container>
    );
};

export default Search;