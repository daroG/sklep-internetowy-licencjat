import React, {useContext, useState} from 'react';
import {Link, NavLink, useHistory} from "react-router-dom";
import {MyContext} from "../../Context";
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
    DropdownItem
} from "reactstrap";
import SearchForm from "./SearchForm";
import categories from "../../utils/Categories";
function TopBar() {

    const history = useHistory();
    const {rootState, logoutUser, removeProductFromCart} = useContext(MyContext);

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const logout = () => {
        logoutUser();
        history.push("/");
    }

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
                                    <DropdownItem key={category.id}>
                                        <Link className="dropdown-item" to={`/oferta/${category.slug}`}>
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
                                {rootState.isAdmin ? (
                                    <>
                                        <NavItem>
                                            <NavLink className="nav-link" to="/admin">Panel administracyjny</NavLink>
                                        </NavItem>
                                    </>
                                ) : null}
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