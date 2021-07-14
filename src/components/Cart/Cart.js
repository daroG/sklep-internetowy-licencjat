import React, {useContext} from 'react';
import {MyContext} from "../../Context";
import {Row, Col, Alert, Container, Button} from "reactstrap";
import {Link} from "react-router-dom";
import TrashIcon from "./TrashIcon";

function Cart() {
    const {rootState, removeProductFromCart} = useContext(MyContext);

    const cart = rootState.cart;

    const sum = cart.reduce((prev, curr) => {
        console.log(prev, curr);
        return prev + curr.price * curr.count;
    }, 0) / 100.0;


    if (cart.length === 0) {
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
                                        to={"/produkt/" + cartItem.id}>{cartItem.name}</Link>
                                    </h3>
                                    <h6>Liczba sztuk: {cartItem.count}</h6>
                                </Col>
                                <Col>
                                    <span>{cartItem.price / 100.0 * cartItem.count}zł</span>
                                    <Button color="danger" className="ml-2"
                                            onClick={() => removeProductFromCart(cartItem)}>
                                        <TrashIcon/>
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={3}>
                                    <img src={cartItem.thumbnail} alt={`Zdjęcie ${cartItem.name}`}
                                         style={{"max-width": "200px"}}/>
                                </Col>
                                <Col md={8} xl={10}>
                                    {cartItem.description}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
                <Row className="mt-5">
                    <Col>
                        <h3>Podsumowanie</h3>
                        <hr/>
                        {cart.map(cartItem => <Row key={cartItem.id}>
                            <span>{cartItem.count}</span> * <span>{cartItem.price / 100.0}zł</span> = <span>{cartItem.price * cartItem.count / 100.0}zł</span>
                        </Row>)}

                        <Row>
                            <h4><strong>Razem: </strong>{sum}zł</h4>
                        </Row>
                        <Row>
                            <Col>
                                <Link to="/transakcja" className="d-block"><Button outline color="primary" className="w-100">Do kasy</Button></Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
}

export default Cart;