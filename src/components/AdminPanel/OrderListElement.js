import React, {useState} from "react";
import {Form, Button, Col, Collapse, ListGroup, ListGroupItem, Row, List, CustomInput} from "reactstrap";
import orderStatus from "../../utils/OrderStatus";


export default function OrderListElement({order, updateStatus}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr>
                <td>{order.name}</td>
                <td>{order.surname}</td>
                <td>{order.email}</td>
                <td>{order['created_at']}</td>
                <td>
                    <Form>
                        <CustomInput value={order.status} onChange={(e) => updateStatus({id: order.id, status: e.target.value})} type="select" id={'status.' + order.id} name={'status.' + order.id}>
                            {orderStatus.map(oStatus => (
                                <option value={oStatus.id}>{oStatus.name}</option>
                            ))}
                        </CustomInput>
                    </Form>
                </td>
                <td><Button color="link" onClick={() => setIsOpen(wasOpen => (!wasOpen))}>Szczegóły zamówienia</Button>
                </td>
            </tr>
            <tr>
                <td colSpan={6}>
                    <Collapse isOpen={isOpen}>
                        <Row>
                            <Col>
                                <List type="unstyled">
                                    <li>Imię i nazwisko zamawiającego: <strong>{order.name} {order.surname}</strong>
                                    </li>
                                    <li>Telefon kontaktowy: <strong>{order.phone}</strong></li>
                                    <li>Adres dostawy: <strong>{order.address} {order.zipCode} {order.city}</strong>
                                    </li>
                                </List>

                                {order['products_orders'].length > 0 ? (
                                    <>
                                        <h6>Zamówione produkty:</h6>
                                        <ListGroup>
                                            {order['products_orders'].map(pOrder => (
                                                <ListGroupItem key={pOrder.id}>
                                                    <ul>
                                                        <li>Id produktu: <strong>{pOrder['product_id']}</strong></li>
                                                        <li>Nazwa produktu: <strong>{pOrder?.product?.name}</strong></li>
                                                        <li>Ilość zamówionego produktu: <strong>{pOrder.quantity}</strong></li>
                                                    </ul>
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    </>
                                ) : null}
                            </Col>
                        </Row>
                    </Collapse>
                </td>
            </tr>
        </>

    )
}