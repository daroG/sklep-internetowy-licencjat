import {Row, Col} from "reactstrap";
import React from "react";
import OrderCard from "../OrderCard";


export default function TransactionList({transactions}){
    return (
        <Row>
            <Col className="mt-3">
                {transactions.map((transaction) =>
                    <OrderCard order={transaction}/>
                )}
            </Col>
        </Row>
    );
}