import React, {useState} from "react";
import {Container, Col, Row, Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from 'classnames';
import ListItems from "./ListItems";

const List = () => {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
        <Nav tabs>
            <NavItem>
                <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                    My List
                </NavLink>
            </NavItem>
        </Nav>
        <Nav tabs>
            <NavItem>
            <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                    My List
                </NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <ListItems />
        </TabPane>
        <TabPane tabId="2">
        <ListItems />
        </TabPane>
      </TabContent>
        </div>
    );
};

export default List;