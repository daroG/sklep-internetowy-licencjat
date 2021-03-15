import React, { useContext, useEffect, useState} from 'react';
import {MyContext} from "../MyContext";
import {Alert, Container, Row, Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Transaction() {

    const {getUserInfo, makeTransaction, clearCart} = useContext(MyContext);

    const [state, setState] = useState({
        name: "",
        surname: "",
        email: "",
        tel: "",
        address: "",
        city: "",
        zipCode: "",
        error: false,
        transactionSuccess: false
    });

    useEffect(() => {
        getUserInfo().then(userData => {
            console.log(userData);
            setState({
                ...state,
                ...userData

            })
        })
    }, [])

    const onChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const isValid = () => {
        return !(state.name.length < 3 ||
            state.city.length < 2 ||
            state.zipCode.length < 5 ||
            state.surname.length < 2 ||
            state.email.length < 5 ||
            state.tel.length < 9 ||
            state.address.length < 5);
    }

    const formSubmit = () => {
        if(!isValid()){
            setState({
                ...state,
                error: true
            })
        }else{
            setState({
                ...state,
                error: false,
            })

            makeTransaction(state).then(data => {
                if(data && data.status === "OK"){
                    clearCart();
                    setState({
                        ...state,
                        error: false,
                        transactionSuccess: true
                    })
                }
            });
        }
    }

    return state.transactionSuccess ? (
        <Container>
            <Row>
                <Col>
                    <h1>Finalizacja zamówienia</h1>
                    <hr/>
                    <Alert variant="success">
                        <Alert.Heading>Zamówienie zostało przyjęte do realizacji</Alert.Heading>
                        <p>Dziękujemy za zakupy w naszym sklepie.</p>
                        <Link to="/"><Button variant="outline-success">Powrót na stronę główną</Button></Link>
                    </Alert>
                </Col>
            </Row>
        </Container>
    ) : (
        <Container>
            <Row>
                <Col>
                    <h1>Finalizacja zamówienia</h1>
                    <hr/>
                    <h3>Podaj dane do zamówienia</h3>
                </Col>
            </Row>
            {state.error ? <Alert variant="warning">Należy wypełnić wszystkie pola formularza</Alert> : null }
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control value={state.name} name="name" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control value={state.surname} name="surname" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={state.email} name="email" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="tel">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control type="tel" value={state.tel} name="tel" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Adres</Form.Label>
                    <Form.Control value={state.address} name="address" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control value={state.city} name="city" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="zipCode">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control value={state.zipCode} name="zipCode" onChange={onChange}/>
                </Form.Group>
                <Button variant="outline-success" block onClick={formSubmit}>
                    Potwierdź zamówienie
                </Button>
            </Form>
        </Container>
    )
}

export default Transaction;