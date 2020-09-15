import React, {useState} from "react";
import {Container, Col, Row, Button} from 'reactstrap';
import "./Results.css";

const Results = (props) => {

    // console.log("Results.js props", props);

    const addListItem = (game) => {

        console.log("Results.js addListItem props.game", game);
        console.log("Results.js props.sessionToken", props.sessionToken);

    };

    return (
        <Col className="border">
        {props.game ?
            <Row id={props.game.id} className="border">
                <Col className="border m-3">
                {props.game.cover ? <img src={props.game.cover.url} alt={props.game.name} /> : ""}
                {props.game ? <Row className="border"><Col className="border m-3"><a href={props.game.url} target="_blank">{props.game.name}</a></Col></Row> : <Row className="border"><Col className="border m-3">{props.game.name}</Col></Row>}
                {props.game.summary ? <Row className="border"><Col className="border m-3">{props.game.summary}</Col></Row> : ''}
                <Row className="border m-3"><Col className="border m-3"><Button color="success" onClick={() => {/*console.log("Results.js Button click props.game", props.game); */addListItem(props.game);}}>Add</Button></Col></Row> 
                </Col>
            </Row>
        : ""
        }
        </Col>
    );
};

export default Results;