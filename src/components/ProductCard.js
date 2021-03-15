import React from 'react';
import Card from "react-bootstrap/Card";
import {NavLink} from "react-router-dom";
import Button from "react-bootstrap/Button";

function ProductCard({id, name, description, thumbnail}) {
    return (
        <Card style={{width: "18rem", marginRight: "1rem", marginBottom: "1rem"}} key={id}>
            <Card.Img variant="top" src={thumbnail}/>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description.substring(0, 30) + '...'}</Card.Text>
                <NavLink to={"/produkt/" + id}>
                    <Button variant="outline-success">Zobacz produkt</Button>
                </NavLink>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;