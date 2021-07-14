import {Nav, NavItem, NavLink, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import React, {useState} from "react";


export default function Tabs({tabs}){

    const [activeTab, setActiveTab] = useState('1');

    const toggleTab = tab => {
        if(activeTab !== tab){
            setActiveTab(tab);
        }
    }

    return (
        <>
            <Nav tabs>
                {tabs.map((tab, index) => (
                    <NavItem key={index}>
                        <NavLink
                            className={classnames({ active: activeTab === (index+1).toString() }, 'cursor-pointer')}
                            onClick={() => { toggleTab((index+1).toString()); }}
                        >
                            {tab.name}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent activeTab={activeTab}>
                {tabs.map((tab, index) =>
                    <TabPane tabId={(index+1).toString()} key={index}>
                        <div className="mt-3">
                            {tab.component}
                        </div>
                    </TabPane>
                )}
            </TabContent>
        </>
    );
}