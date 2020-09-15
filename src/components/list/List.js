import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import "./List.css";
import classnames from "classnames";
import ListItems from "./ListItems";

const List = (props) => {

    const [activeTab, setActiveTab] = useState("1");

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    };

    useEffect(() => {
        console.log("List.js props.sessionToken", props.sessionToken);
    }, [props.sessionToken]);

    return (
        <div>
        <Nav tabs>
            <NavItem>
                <NavLink className={classnames({ active: activeTab === "1" })} onClick={() => { toggle("1"); }}>
                    My List
                </NavLink>
            </NavItem>
        </Nav>
        <Nav tabs>
            <NavItem>
            <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => { toggle("2"); }}>
                    My List
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} />
        </TabPane>
        <TabPane tabId="2">
        <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} />
        </TabPane>
      </TabContent>
        </div>
    );
};

export default List;