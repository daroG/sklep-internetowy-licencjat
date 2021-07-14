import React, {useState} from 'react';

import {CardBody, CardText, CardTitle, CardSubtitle, CardLink, CardImg, Card, Collapse, Row, Col} from 'reactstrap';
import Helpers from "../Helpers";

function OrderCard({order}){

    const [openProducts, setOpenProducts] = useState(false);
    const [open, setOpen] = useState(false);

    const translateStatus = (status) => status === 1 ? "zamówiono" : status === 2 ? "w trakcie realizacji" : "dostarczono";

    const {created_at, id, status, name, surname, email, tel, address, city, zipCode, products_orders} = order;

    return (
        <Card className="mb-4">
            <CardBody>
                <CardTitle tag="h5">Zamówienie o numerze {id}</CardTitle>
                <CardSubtitle tag="h6">{created_at}</CardSubtitle>
                <CardText>{translateStatus(status)}</CardText>
                <CardLink onClick={() => setOpenProducts(prev => !prev)} className="cursor-pointer">Zobacz zamówione produkty</CardLink>
                <Collapse isOpen={openProducts}>
                    <Row className="my-5">
                        <Col>
                            {products_orders.map(({product, quantity, final_price}) =>
                                <Card style={{width: "18rem", marginRight: "1rem", marginBottom: "1rem"}} key={product.name}>
                                    <CardImg variant="top" src={product.thumbnail_url}/>
                                    <CardBody>
                                        <CardTitle tag="h5">{product.name}</CardTitle>
                                        <CardText>Zamówiono {quantity} sztuk{quantity === 1 ? "ę" : quantity < 5 ? "i" : null} za {Helpers.displayAsPrice(final_price)}zł</CardText>
                                    </CardBody>
                                </Card>
                            )}
                        </Col>
                    </Row>
                </Collapse>
                <div/>
                <CardLink onClick={() => setOpen(open => !open)}>Zobacz szczegóły zamówienia</CardLink>
                <Collapse isOpen={open}>
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
            </CardBody>
        </Card>
    )
}

export default OrderCard;