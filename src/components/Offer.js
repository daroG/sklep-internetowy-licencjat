import React, {useContext, useEffect, useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {NavLink, useLocation} from "react-router-dom";
import {MyContext} from "../MyContext";
import Row from "react-bootstrap/Row";
import {Col} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import ProductCard from "./ProductCard";


function Offer() {
    const location = useLocation();
    const context = useContext(MyContext);

    const [products, setProducts] = useState([]);
    const [activeKey, setActiveKey] = useState(0);

    useEffect(() => {
        (async () => {
            let products = await context.getProducts();

            const cat = location?.state?.category;

            setProducts(products);

            if(cat){
                setActiveKey(cat);
            }

            console.log(cat, typeof cat);
        })();

    }, []);

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

    const onCategorySelect = (eventKey) => {
        setActiveKey(+eventKey);
    }

    const productsToDisplay = () => {
        if (!products)
            return [];
        else
            return activeKey === 0 ? products : products.filter(p => +p.category_id === activeKey)
    };

    return (
        <Container fluid="xl">
            <Row className="pb-3">
                <Col>
                    <Nav variant="pills" activeKey={activeKey} onSelect={onCategorySelect}>
                        {categories.map(category =>
                            <Nav.Item>
                                <Nav.Link eventKey={category.id}>{category.name}</Nav.Link>
                            </Nav.Item>)}
                    </Nav>
                </Col>
            </Row>
            <Row style={{'justify-content': 'center'}}>
                {productsToDisplay().length > 0 ? productsToDisplay().map(product =>
                    <ProductCard id={product.id} name={product.name} description={product.description} thumbnail={product.thumbnail} />
                ) : <Col><h3 className="py-5 text-center">Brak produktów w tej kategorii</h3></Col>}
            </Row>
        </Container>
    )
}

export default Offer;