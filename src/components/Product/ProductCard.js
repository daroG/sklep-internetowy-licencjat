import React from 'react';
import {Card, Button, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from "reactstrap";
import {NavLink} from "react-router-dom";
import Helpers from "../../Helpers";

function ProductCard({id, name, description, thumbnail, price}) {

    return (
        <Card style={{width: "18rem", marginRight: "1rem", marginBottom: "1rem"}} key={id}>
            <CardImg variant="top" src={thumbnail}/>
            <CardBody>
                <CardTitle tag="h5">{name}</CardTitle>
                <CardSubtitle tag="h6">{`${Helpers.displayAsPrice(price)} zł`}</CardSubtitle>
                <CardText>{description.substring(0, 30) + '...'}</CardText>
                <NavLink to={"/produkt/" + id}>
                    <Button color="outline-success">Zobacz produkt</Button>
                </NavLink>
            </CardBody>
        </Card>
    )
}

export default ProductCard;