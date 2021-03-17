import React, {Component} from 'react';
import {Accordion, Button, Col, Form} from "react-bootstrap";
import {MyContext} from "../MyContext";

class PersonalData extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: "Jan",
            surname: "Kowalski",
            email: "jan.kowalski@example.com",
            phone: "+48 123 456 789",
            address: "Fiołkowa 2/2",
            city: "Katowice",
            zipCode: "40-123"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

        this.context.isLoggedIn();

        this.context.getUserInfo().then(userData => {
            this.setState({
                ...userData
            });
        })
    }

    handleChange(e){

        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick(e){
        e.preventDefault();
        this.context.updateUserInfo(this.state).then(result => {
            if (result){
                alert("Zauktualizowano dane!");
            }else {
                alert("Aktualizacja nie powiodła się");
            }
        })
    }

    render(){

        const {name, surname, email, phone, address, city, zipCode} = this.state;

        return (
            <div className="mt-4">
                <Form>
                    <Form.Group>
                        <Form.Label>Imię:</Form.Label>
                        <Form.Control type="text" value={name} name="name" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nazwisko:</Form.Label>
                        <Form.Control type="text" value={surname} name="surname" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adres email:</Form.Label>
                        <Form.Control type="email" value={email} name="email" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Numer telefonu:</Form.Label>
                        <Form.Control type="tel" value={phone} name="phone" onChange={this.handleChange}/>
                    </Form.Group>
                    <Accordion className="mb-4">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Dane adresowe
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <>
                                <Form.Group>
                                    <Form.Label>Adres</Form.Label>
                                    <Form.Control type="text" value={address} name="address" onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Miasto</Form.Label>
                                            <Form.Control type="text" value={city} name="city" onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label>Kod pocztowy</Form.Label>
                                            <Form.Control type="text" value={zipCode} name="zipCode" onChange={this.handleChange}/>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>
                            </>
                        </Accordion.Collapse>
                    </Accordion>
                    <Button variant="primary" onClick={this.handleClick} type="submit">
                        Zapisz zmiany
                    </Button>
                </Form>
            </div>
        )
    }
}

PersonalData.contextType = MyContext;

export default PersonalData;