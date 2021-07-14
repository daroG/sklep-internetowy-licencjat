import {Link} from "react-router-dom";
import React from "react";
import {
    Badge,
    DropdownToggle,
    Button,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import CartIcon from "./CartIcon";
import TrashIcon from "./TrashIcon";


function NewCartOnBar({cart, removeProductFromCart}) {
    return (cart.length === 0) ? (
        <Button color="success">
            <CartIcon/>
            Koszyk (Pusty)
        </Button>

    ) : (
        <ButtonGroup>
            <Link to='/koszyk'>
                <Button color="success">
                    <CartIcon/>
                    Koszyk ({cart.length})
                </Button>
            </Link>
            <UncontrolledButtonDropdown>
                <DropdownToggle caret color="success">
                </DropdownToggle>
                <DropdownMenu>
                    {cart.map(cartItem =>
                        <>
                            <DropdownItem>
                                <Link to={"/produkt/" + cartItem.id}
                                >{cartItem.name}</Link>
                                <Badge className="mx-1 p-2">{cartItem.count}</Badge>
                                <Button color="danger" className="ml-2" onClick={() => removeProductFromCart(cartItem)}>
                                    <TrashIcon/>
                                </Button>
                            </DropdownItem>
                            <DropdownItem divider/>
                        </>
                    )}
                </DropdownMenu>
            </UncontrolledButtonDropdown>
        </ButtonGroup>
    )
}

export default NewCartOnBar;