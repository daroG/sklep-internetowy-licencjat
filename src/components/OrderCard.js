import React, {useState} from 'react';

import {Card, Collapse, Row, Col} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

function OrderCard({order}){

    const [openProducts, setOpenProducts] = useState(false);
    const [open, setOpen] = useState(false);

    const translateStatus = (status) => status == 1 ? "zamówiono" : status == 2 ? "w trakcie realizacji" : "dostarczono";


    // console.log(order);
    // return <div>Tu będą transakcje</div>

    const {created_at, id, status, name, surname, email, tel, address, city, zipCode, products_orders} = order;

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Zamówienie o numerze {id}</Card.Title>
                <Card.Subtitle>{created_at}</Card.Subtitle>
                <Card.Text>{translateStatus(status)}</Card.Text>
                <Card.Link onClick={() => setOpenProducts(!openProducts)}>Zobacz zamówione produkty</Card.Link>
                <Collapse in={openProducts}>
                    <Row>
                        <Col>
                            {products_orders.map(({product, quantity, final_price}) =>
                                <Card style={{width: "18rem", marginRight: "1rem", marginBottom: "1rem"}} key={product.name}>
                                    <Card.Img variant="top" src={product.thumbnail_url}/>
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>Zamówiono {quantity} sztuk{quantity == 1 ? "ę" : quantity < 5 ? "i" : null} za {final_price/100.0}zł</Card.Text>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Collapse>
                <div/>
                <Card.Link onClick={() => setOpen(!open)}>Zobacz szczegóły zamówienia</Card.Link>
                <Collapse in={open}>
                    <Row>
                        <Col>
                            <p>Podane dane:</p>
                            <ul>
                                <li>{name} {surname}</li>
                                <li>{email} {tel}</li>
                                <li>{address} {city} {zipCode}</li>
                            </ul>
                        </Col>
                    </Row>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

export default OrderCard;