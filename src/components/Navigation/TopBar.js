import React, {useContext, useState} from 'react';
import {Link, NavLink, useHistory} from "react-router-dom";
import {MyContext} from "../../MyContext";
import CartOnBar from "../Cart/CartOnBar";
import {
    Container,
    DropdownToggle,
    UncontrolledDropdown,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    DropdownMenu,
    DropdownItem,
    Form,
    InputGroup,
    Input,
    Button,
    InputGroupAddon
} from "reactstrap";
import SearchForm from "./SearchForm";
function TopBar() {

    const history = useHistory();
    const {rootState, logoutUser, removeProductFromCart} = useContext(MyContext);

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

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
                <NavbarBrand>Sklep internetowy</NavbarBrand>
                <NavbarToggler aria-controls="basic-navbar-nav" onClick={toggleNavbar}/>
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar className="mr-auto">
                        <NavItem>
                            <NavLink className="nav-link" to="/">Strona główna</NavLink>
                        </NavItem>
                        <UncontrolledDropdown>
                            <DropdownToggle nav caret>
                                Oferta
                            </DropdownToggle>
                            <DropdownMenu>
                                {categories.map(category =>
                                    <DropdownItem>
                                        <Link className="dropdown-item" to={{
                                            pathname: "/oferta",
                                            state: {category: category.id}
                                        }}>
                                            {category.name}
                                        </Link>
                                    </DropdownItem>
                                )}

                            </DropdownMenu>
                        </UncontrolledDropdown>
                        {!rootState.showLogin ? (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink className="nav-link" to="/panel-klienta">Panel klienta</NavLink>
                                </NavItem>
                                <NavItem>
                                    <button className="nav-link btn btn-outline-warning" onClick={logout}>Wyloguj się
                                    </button>
                                </NavItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <NavItem>
                                    <NavLink className="nav-link" to="/logowanie">Logowanie</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/rejestracja">Rejestracja</NavLink>
                                </NavItem>
                            </React.Fragment>
                        )}

                    </Nav>
                    <div className="mr-3">
                        <CartOnBar cart={rootState.cart} removeProductFromCart={removeProductFromCart}/>
                    </div>
                    <SearchForm/>
                </Collapse>
            </Navbar>
        </Container>
    )
}

export default TopBar;