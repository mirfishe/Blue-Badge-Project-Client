import React, {useState} from "react";
import {Container, Col, Row, Button, Card, CardBody, CardTitle} from 'reactstrap';
import "./Results.css";

const Results = (props) => {

    // console.log("Results.js props", props);

    const addListItem = (game) => {

        console.log("Results.js addListItem props.game", game);

    };

    return (
        <Col>
        {props.game ?
            <Card id={props.game.id}>
                <CardBody>
                {props.game.cover ? <img src={props.game.cover.url} alt={props.game.name} /> : ""}
                {props.game ? <CardTitle><a href={props.game.url} target="_blank">{props.game.name}</a></CardTitle> : <CardTitle>{props.game.name}</CardTitle>}
                <Button color="success" onClick={() => {/*console.log("Results.js Button click props.game", props.game); */addListItem(props.game);}}>Add</Button>
                </CardBody>
            </Card>
        : ""
        }
        </Col>
    );
};

export default Results;