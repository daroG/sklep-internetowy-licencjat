import React, {useContext} from 'react';
import {Nav, Container, Navbar, NavDropdown, Form, InputGroup} from "react-bootstrap";
import {Link, NavLink, useHistory} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {MyContext} from "../MyContext";
import CartOnBar from "./Cart/CartOnBar";

function TopBar() {

    const history = useHistory();
    const {rootState, logoutUser, removeProductFromCart} = useContext(MyContext);

    const logout = () => {
        logoutUser();
        history.push("/");
    }

    let categories = [
        {
            name: "wszystkie",
            id: 0
        },
        {
            name: "makramy",
            id: 1
        }, {
            name: "łapacze snów",
            id: 2
        }, {
            name: "ozdoby na lustro",
            id: 3
        }, {
            name: "biżuteria",
            id: 4
        }, {
            name: "serwetki",
            id: 5
        }, {
            name: "ozdoby na donice",
            id: 6
        }, {
            name: "inne wyroby",
            id: 7
        }]

    return (
        <Container fluid>
            <Navbar expand="lg">
                <Navbar.Brand>Sklep internetowy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <NavLink className="nav-link" to="/">Strona główna</NavLink>
                        <NavDropdown title="Oferta" id="oferta-dropdown">
                            {categories.map(category => <Link className="dropdown-item" to={{
                                pathname: "/oferta",
                                state: {category: category.id}
                            }}>{category.name}</Link>)}

                        </NavDropdown>
                        {!rootState.showLogin ? (
                            <React.Fragment>
                                <NavLink className="nav-link" to="/panel-klienta">Panel klienta</NavLink>
                                <button className="nav-link btn btn-outline-warning" onClick={logout}>Wyloguj się
                                </button>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <NavLink className="nav-link" to="/logowanie">Logowanie</NavLink>
                                <NavLink className="nav-link" to="/rejestracja">Rejestracja</NavLink>
                            </React.Fragment>
                        )}

                    </Nav>
                    <div className="mr-3">
                        <CartOnBar cart={rootState.cart} removeProductFromCart={removeProductFromCart}/>
                    </div>
                    <Form inline>
                        <InputGroup>
                            <Form.Control type="text" placeholder="Szukaj w sklepie..."/>
                            <InputGroup.Append>
                                <Button type="submit">Szukaj</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default TopBar;