import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import "./List.css";
import classnames from "classnames";
import ListItems from "./ListItems";
import CreateList from "./CreateList";
import EditList from "./EditList";
import DeleteList from "./DeleteList";

const List = (props) => {

    const [activeTab, setActiveTab] = useState("1");
    const [addList, setAddList] = useState(false);
    const [editList, setEditList] = useState(false);
    const [deleteList, setDeleteList] = useState(false)
    const [listToEdit, setListToEdit] = useState({})
    const [listToDelete, setListToDelete] = useState({})

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    };

    const addOn = () => {
        setAddList(true);
    }

    const editOn = () => {
        setEditList(true);
    }

    const deleteOn = () => {
        setDeleteList(true);
    }

    const updateListToEdit = (list) => {
        setListToEdit(list);
    }

    const updateListToDelete = (list) => {
        setListToDelete(list);
    }

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
            <NavItem>
            <NavLink className={classnames({ active: activeTab === "2" })} onClick={() => { toggle("2"); addOn(); }}>
                    {(addList) ? <CreateList setAddList={setAddList} sessionToken={props.sessionToken} baseURL={props.baseURL}/>: "Add List"}
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