import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import "./List.css";
import classnames from "classnames";
import ListItems from "./ListItems";
import CreateList from "./CreateList";
import EditList from "./EditList";
import DeleteList from "./DeleteList";
import ListID from './ListID'; //Testing purposes

const List = (props) => {

    const [activeTab, setActiveTab] = useState("1");
    const [addList, setAddList] = useState(false);
    const [editList, setEditList] = useState(false);
    const [deleteList, setDeleteList] = useState(false)
    const [listToEdit, setListToEdit] = useState({})
    const [listToDelete, setListToDelete] = useState({})
    const [lists, setLists] = useState([]);

    const toggle = (tab, id) => {

      if(activeTab !== tab) {
        setActiveTab(tab);
        props.setActiveList(id);
      };

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
    
    const getList = () => {

        let url = props.baseURL + "list/";

      fetch(url, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": props.sessionToken
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("getList json", json);
          setLists(json);
        })
        .catch((err) => console.log(err));
    } 
    useEffect(() => {
        getList();
    },[props.sessionToken])

    useEffect(() => {
      console.log("List.js props.sessionToken", props.sessionToken);
      // console.log("List.js localStorage token", localStorage.getItem("token"));
  }, [props.sessionToken]);

    useEffect(() => {
        console.log("List.js props.activeList", props.activeList);
    }, [props.activeList]);
    

    return (
        <div>
            <Nav>
                {lists.length > 0 ?lists.map((lists, index) => {
                    return(
                    <NavItem key={index}>
                     <NavLink className={classnames({ active: activeTab === index })} onClick={() => { toggle(index, lists.id); }}>
                         {lists.listName}
                     </NavLink>
                    </NavItem>
                    )}
                     ) 
                     : ''}
            <NavItem>
            <NavLink onClick={() => { addOn(); }}>
                    {(addList) ? <CreateList setAddList={setAddList} sessionToken={props.sessionToken} baseURL={props.baseURL} getList={getList}/>: "Add List"}
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
            Testing 1
        <ListItems baseURL={props.baseURL}  sessionToken={props.sessionToken} activeList={props.activeList} />
        </TabPane>
        <TabPane tabId="2">
            Testing 2
        <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} />
        </TabPane>
        {/* <ListID baseURL={props.baseURL} sessionToken={props.sessionToken} /> */}
      </TabContent>
        </div>
    );
};

export default List;