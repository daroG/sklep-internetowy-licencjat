import {Spinner, Row, Col, Alert} from "reactstrap";
import React from "react";
import OrderCard from "../OrderCard";


export default function TransactionList({transactions, isLoading}) {

    return (
        <Row>
            <Col className="mt-3">
                {isLoading ? (
                    <Row>
                        <Spinner color="primary" size="xl" className="mx-auto"/>
                    </Row>
                ) : (transactions.length > 0 ? transactions.map((transaction) =>
                    <OrderCard order={transaction}/>
                ) : <Alert color="primary">Brak dotychczasowych zakupów.</Alert>)}

            </Col>
        </Row>
    );
}