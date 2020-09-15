import React, {useState, useEffect} from "react";
import {Container, Col, Row, Form, FormGroup, Button, Input} from "reactstrap";
import Results from "./Results";

const Search = (props) => {

    const [searchTerms, setSearchTerms] = useState('');
    const [results, setResults] = useState([]);

    const searchGames = (event) => {
        event.preventDefault();

    };

    useEffect(() => {
        console.log(results);
    }, [results]);

    return (
        <Container className="m-3">
        <Row className="m-3">
        <Form onSubmit={searchGames}>
        <FormGroup>
        <Input type="text" id="searchTerms" placeholder="Search Terms" value={searchTerms} onChange={(e) => {/*console.log(e.target.value); */setSearchTerms(e.target.value);}} />
        </FormGroup>
        <Button type="submit" color="primary">Search</Button>
        </Form>
        </Row>
        <Row>
            {/* {results.length > 0 ? results.map(game => card(game)) : ''} */}
            <Results />
        </Row>
        </Container>
    );
};

export default Search;