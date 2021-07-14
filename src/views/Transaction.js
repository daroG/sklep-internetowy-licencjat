import React, { useContext, useEffect, useState} from 'react';
import {MyContext} from "../Context";
import {Alert, Container, Row, Col, Form, Button, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

function Transaction() {

    const {getUserInfo, makeOrder, clearCart} = useContext(MyContext);

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

            makeOrder(state).then(data => {
                if(data){
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
                    <Alert color="success">
                        <h4 className="alert-heading">Zamówienie zostało przyjęte do realizacji</h4>
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
            {state.error ? (<Alert color="warning">Należy wypełnić wszystkie pola formularza</Alert>) : null }
            <Form>
                <FormGroup>
                    <Label for="name">Imię</Label>
                    <Input value={state.name} name="name" onChange={onChange} id="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="surname">Nazwisko</Label>
                    <Input value={state.surname} name="surname" onChange={onChange} id="surname"/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" value={state.email} name="email" onChange={onChange} id="email"/>
                </FormGroup>
                <FormGroup>
                    <Label for="tel">Numer telefonu</Label>
                    <Input type="tel" value={state.tel} name="tel" onChange={onChange} id="tel"/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Adres</Label>
                    <Input value={state.address} name="address" onChange={onChange} id="address"/>
                </FormGroup>
                <FormGroup>
                    <Label for="city">Miasto</Label>
                    <Input value={state.city} name="city" onChange={onChange} id="city"/>
                </FormGroup>
                <FormGroup>
                    <Label for="zipCode">Kod pocztowy</Label>
                    <Input value={state.zipCode} name="zipCode" onChange={onChange} id="zipCode"/>
                </FormGroup>
                <Button variant="outline-success" block onClick={formSubmit}>
                    Potwierdź zamówienie
                </Button>
            </Form>
        </Container>
    )
}

export default Transaction;