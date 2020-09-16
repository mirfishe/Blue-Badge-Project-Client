import React, {useState, useEffect} from "react";
import {Container, Col, Row, Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import "./Results.css";

const Results = (props) => {

    // console.log("Results.js props", props);

    const addListItem = (game) => {

        let URL = props.baseURL + "item/add/" + props.activeList;
        console.log("Results.js URL", URL);

        let listItemObject = {
            itemName: game.name,
            itemURL: game.url,
            imageURL: game.cover.url,
            sortID: 0
        };
        console.log("Results.js listItemObject", listItemObject);

        fetch(URL, {
            method: "POST",
            headers:    new Headers ({
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            }),
            body: JSON.stringify({item: listItemObject})
        })
        .then(res => {console.log("Results.js response", res); res.json();}) // {console.log("Search.js response", res); res.json();}
        // .then(() => ) // re-fetch list items and display in component
        .catch(err => console.log(err))


        // .then(() => ) // re-fetch list items and display in component

    };

    useEffect(() => {
        // console.log("Results.js props.sessionToken", props.sessionToken); // Never shows the current value of sessionToken
        // console.log("Results.js localStorage token", localStorage.getItem("token"));
    }, []);

    useEffect(() => {
        console.log("Results.js activeList", props.activeList);
    }, [props.activeList]);

    return (
        <Col>
        {props.game ?
            <Card id={props.game.id}>
                <CardBody>
                {props.game.cover ? <img src={props.game.cover.url} alt={props.game.name} /> : ""}
                {props.game ? <CardTitle><a href={props.game.url} target="_blank">{props.game.name}</a></CardTitle> : <CardTitle>{props.game.name}</CardTitle>}
                {props.game.summary ? <CardText>{props.game.summary}</CardText> : ''}
                <Button color="success" onClick={() => {/*console.log("Results.js Button click props.game", props.game); */addListItem(props.game);}}>Add</Button>
                </CardBody>
            </Card>
        : ""
        }
        </Col>
    );
};

export default Results;