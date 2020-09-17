import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Button, Card, CardBody, CardText, CardTitle} from 'reactstrap';
import "./Results.css";

const Results = (props) => {

    // console.log("Results.js props", props);

    const [errForm, setErrForm] = useState("");

    const addListItem = (game) => {

        let URL = props.baseURL + "item/add/" + props.activeList;
        // console.log("Results.js URL", URL);

        let coverURL = "";
        game.cover ? coverURL = game.cover.url : coverURL = "";

        let listItemObject = {
            itemName: game.name,
            itemURL: game.url,
            imageURL: coverURL,
            sortID: 0
        };
        // console.log("Results.js listItemObject", listItemObject);

        fetch(URL, {
            method: "POST",
            headers:    new Headers ({
                'Content-Type': 'application/json',
                "Authorization": props.sessionToken
            }),
            body: JSON.stringify({item: listItemObject})
        })
        .then(res => {
            // console.log("Results.js response", res);
            return res.json();
        })
        .then(() => props.setListItemsUpdated(true)) // re-fetch list items and display in list items component
        .catch(err => {
            console.log(err);
            setErrForm(err);
        })

    };

    // useEffect(() => {
    //     console.log("Results.js props.sessionToken", props.sessionToken);
    //     // console.log("Results.js localStorage token", localStorage.getItem("token"));
    // }, [props.sessionToken]);

    // useEffect(() => {
    //     console.log("Results.js activeList", props.activeList);
    // }, [props.activeList]);

    return (
        <Col>
        {props.game ?
            <Card id={props.game.id}>
                    <div class="resultsBorder">
                <CardBody>
                {props.game.cover ? <img src={props.game.cover.url} alt={props.game.name} /> : ""}
                {props.game ? <CardTitle><a href={props.game.url} target="_blank">{props.game.name}</a></CardTitle> : <CardTitle>{props.game.name}</CardTitle>}
                {props.game.summary ? <CardText>{props.game.summary}</CardText> : ''}
                {props.sessionToken !== null && props.sessionToken !== undefined ? <Button color="success" onClick={() => {/*console.log("Results.js Button click props.game", props.game); */ addListItem(props.game);}}>Add</Button> : ''}
                {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
                </CardBody>
                </div>
            </Card>
        : ""
        }
        </Col>
    );
};

export default Results;