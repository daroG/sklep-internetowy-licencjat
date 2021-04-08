import React, {useState, useContext, useEffect} from 'react';

import PersonalData from '../components/ClientPanel/PersonalData';
import {MyContext} from '../MyContext';

import  {Row, Col, Container} from 'reactstrap';
import TransactionList from "../components/ClientPanel/TransactionList";
import {Tabs} from "../components/Utils";

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
                    <h1>Panel klienta</h1>
                </Col>
            </Row>
            <Tabs tabs={[
                {name: 'Dotychczasowe transakcje', component: <TransactionList transactions={transactions}/>},
                {name: 'Dane użytkownika', component: <PersonalData/>}
            ]}/>
        </Container>
    )
}

export default ClientPanel;