import React, {useState, useContext, useEffect} from 'react';

import OrderCard from './OrderCard';
import PersonalData from './PersonalData';
import {MyContext} from '../MyContext';

import {Tabs, Tab, Form, Button, Accordion, Col, Container, Row} from 'react-bootstrap';

function ClientPanel() {
    const {getTransactions} = useContext(MyContext);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions().then(data => {
            if(data !== {}){
                console.log(data);
                setTransactions([
                    ...transactions,
                    ...data,
                ])
            }
        })
    }, [])

    return (
        <Container fluid="xl">
            <Row>
                <Col>
                    <h1>Panel klienta - {}</h1>
                </Col>
            </Row>
            <Tabs defaultActiveKey="shopping-list" id="profileTabs">
                <Tab eventKey="shopping-list" title="Moje zakupy">
                    <div className="mt-3">
                        {transactions.map((transaction) =>
                            <OrderCard order={transaction}/>
                        )}
                    </div>
                </Tab>
                <Tab eventKey="data" title="Moje dane">
                    <PersonalData />
                </Tab>
            </Tabs>
        </Container>
    )
}

export default ClientPanel;