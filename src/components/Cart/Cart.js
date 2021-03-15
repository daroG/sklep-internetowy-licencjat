import React, {useContext} from 'react';
import {MyContext} from "../../MyContext";
import {Row, Col, Alert, Container, Badge, Button, Image} from "react-bootstrap";
import {Link} from "react-router-dom";

function Cart() {
    const {rootState, removeProductFromCart} = useContext(MyContext);

    const cart = rootState.cart;

    const sum = cart.reduce((prev, curr) => {
        console.log(prev, curr);
        return prev + curr.price * curr.count;
    }, 0) / 100.0;


    if(cart.length === 0) {
        return <Container>
            <Row>
                <Col>
                    <h1>Koszyk</h1>
                    <Alert variant="info">Twój koszyk jest pusty</Alert>
                </Col>
            </Row>
        </Container>
    }
    return <Container>
        <Row>
            <Col>
                <h1>Koszyk</h1>
                {cart.map(cartItem =>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                <h3><Link
                                    to={"/produkt/" + cartItem.id}>{cartItem.name}</Link><Badge>[{cartItem.count}]</Badge>
                                </h3>
                                </Col>
                                <Col>
                                    <span>{cartItem.price / 100.0 * cartItem.count}zł</span>
                                <Button variant="danger" className="ml-2"
                                        onClick={removeProductFromCart.bind(null, cartItem)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                         fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <Image src={cartItem.thumbnail} alt={`Zdjęcie ${cartItem.name}`} style={{"max-width": "200px"}}/>
                                </Col>
                                <Col md={8} xl={10}>
                                    {cartItem.description}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col>
                        <h5>Podsumowanie</h5>
                        <hr/>
                        {cart.map(cartItem => <Row>
                            <span>{cartItem.count}</span> * <span>{cartItem.price/ 100.0}zł</span> = <span>{cartItem.price * cartItem.count / 100.0}zł</span>
                        </Row>)}

                        <Row>
                            <p><strong>Razem: </strong>{sum}zł</p>
                        </Row>
                        <Row>
                            <Link to="/transakcja"><Button variant="outline-primary" block>Do kasy</Button></Link>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}

export default Cart;