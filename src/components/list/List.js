import React, {useState, useEffect} from "react";
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane, Button} from "reactstrap";
import "./List.css";
import classnames from "classnames";
import ListItems from "./ListItems";
import CreateList from "./CreateList";
import EditList from "./EditList";
import DeleteList from "./DeleteList";
import ListID from './ListID'; //Testing purposes

const List = (props) => {

    const [activeTab, setActiveTab] = useState(0);
    const [addList, setAddList] = useState(false);
    const [editList, setEditList] = useState(false);
    const [deleteList, setDeleteList] = useState(false)
    const [listToEdit, setListToEdit] = useState({})
    const [listToDelete, setListToDelete] = useState({})
    const [lists, setLists] = useState([]);

    const toggleTab = (tab) => {

      if(activeTab !== tab) {
        setActiveTab(tab);
      };

    };

    const toggleId = (id) => {
        if(props.activeList !== id) {
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
          // console.log("getList json", json);
          setLists(json);
          props.setActiveList(json[0].id);
          setActiveTab(0);
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
            <Nav tabs>
                {lists.length > 0 ?lists.map((lists, index) => {
                    return(
                    <NavItem key={index}>
                     <NavLink className={classnames({ active: activeTab === index })} index={index} onClick={() => { toggleTab(index); toggleId(lists.id)  }}>
                         {lists.listName}
                     </NavLink>
                    </NavItem>
                    )}) : ''}
            <NavItem>
            <NavLink onClick={() => { addOn(); }}>
                    {(addList) ? <CreateList setAddList={setAddList} sessionToken={props.sessionToken} baseURL={props.baseURL} getList={getList}/>: <Button color="primary" size="sm">Add List</Button>}
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId={0}>
     
        <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} />
        </TabPane>
      </TabContent>
      <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} />
        </div>
    );
};

export default List;