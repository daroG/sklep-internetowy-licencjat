import React, {useContext} from 'react';

import PersonalData from '../components/ClientPanel/PersonalData';
import {MyContext} from '../Context';

import  {Row, Col, Container} from 'reactstrap';
import {Tabs} from "../components/Utils";
import ProductList from "../components/AdminPanel/ProductList";
import UserList from "../components/AdminPanel/UserList";
import OrderList from "../components/AdminPanel/OrderList";
import {Redirect} from "react-router-dom";

function ClientPanel() {

    const {rootState} = useContext(MyContext);

    return !rootState.isAdmin ? <Redirect to={"/"}/> : (
        <Container fluid="xl">
            <Row>
                <Col>
                    <h1>Panel administracyjny</h1>
                </Col>
            </Row>
            <Tabs tabs={[
                {name: 'Obecne zamówienia', component: <OrderList/>},
                {name: 'Edycja produktów', component: <ProductList/>},
                {name: 'Dane użytkownika', component: <UserList/>},
            ]}/>
        </Container>
    )
}

export default ClientPanel;