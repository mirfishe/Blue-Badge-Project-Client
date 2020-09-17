import React, {useState, useEffect} from "react";
import {Container, Col, Row, Alert, Button, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import "./List.css";
import classnames from "classnames";
import ListItems from "./ListItems";
import CreateList from "./CreateList";
import EditList from "./EditList";
import DeleteList from "./DeleteList";

const List = (props) => {
    const [activeTab, setActiveTab] = useState(0);
    const [errForm, setErrForm] = useState("");
    const [addList, setAddList] = useState(false);
    const [editList, setEditList] = useState(false);
    const [deleteList, setDeleteList] = useState(false)
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

    useEffect(() => {
      // console.log("List.js props.sessionToken", props.sessionToken);
      // console.log("List.js localStorage token", localStorage.getItem("token"));
      getList();
  }, [props.sessionToken]);

  //   useEffect(() => {
  //       console.log("List.js props.activeList", props.activeList);
  //   }, [props.activeList]);

  //Testing a color picker for the border because I am indecisive



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
          if (!addList) {
            props.setActiveList(json[0].id);
          }
        })
        .catch(err => {
          console.log(err);
          setErrForm(err);
      })
    };

    return (
        <div className="listStyle">
          {errForm !== "" ? <Alert color="danger">{errForm}</Alert> : ""}
            <Nav tabs>
                {lists.length > 0 ? lists.map((lists, index) => {
                    return(
                    <NavItem key={index}>
                     <NavLink className={classnames({ active: activeTab === index })} index={index} onClick={() => { toggleTab(index); toggleId(lists.id)  }}>
                         {lists.listName}
                     </NavLink>
                    </NavItem>
                    )}) : ''}
            <NavItem>
            <NavLink className="addList" onClick={() => { addOn(); }}>
                    {(addList) ? <CreateList setAddList={setAddList} sessionToken={props.sessionToken} baseURL={props.baseURL} getList={getList}/> : null}Add List
                </NavLink>
            </NavItem>
        </Nav>
        <Container className="d-flex justify-content-end my-2">
            <Button className="mr-3" color="primary" size="sm" onClick={() => { editOn(); }}>{(editList) ?<EditList baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} getList={getList} setEditList={setEditList}/> : null}Edit List</Button>
            <Button className="mr-3" color="danger" size="sm" onClick={() => { deleteOn(); }}>{(deleteList) ?<DeleteList baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} getList={getList} setDeleteList={setDeleteList}/> : null}Delete List</Button>
        </Container>
    
        <TabContent>
        <TabPane>
          {lists.length > 0 ? <ListItems baseURL={props.baseURL} sessionToken={props.sessionToken} activeList={props.activeList} listItemsUpdated={props.listItemsUpdated} setListItemsUpdated={props.setListItemsUpdated} /> : ""}
        </TabPane>
        </TabContent>
        </div>
    );
};

export default List;