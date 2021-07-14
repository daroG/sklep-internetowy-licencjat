import React, {useState, useContext, useEffect} from 'react';

import PersonalData from '../components/ClientPanel/PersonalData';
import {MyContext} from '../Context';

import  {Row, Col, Container} from 'reactstrap';
import TransactionList from "../components/ClientPanel/TransactionList";
import {Tabs} from "../components/Utils";

function ClientPanel() {
    const {getTransactions} = useContext(MyContext);

    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getTransactions().then(data => {
            if(data !== {}){
                console.log(data);
                setTransactions([
                    ...transactions,
                    ...data,
                ])
            }
            setIsLoading(false);
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
                {name: 'Dotychczasowe zakupy', component: <TransactionList transactions={transactions} isLoading={isLoading}/>},
                {name: 'Dane użytkownika', component: <PersonalData/>}
            ]}/>
        </Container>
    )
}

export default ClientPanel;