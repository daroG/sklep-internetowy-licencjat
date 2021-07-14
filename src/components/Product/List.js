import {Spinner, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import categories from "../../utils/Categories";
import ProductCard from "./ProductCard";
import React, {Fragment, useEffect, useState} from "react";
import {useHistory} from "react-router";

export default function List({products: givenProducts, activeCategory = categories[0], pushLinksToHistory = false, isLoading = false}) {

    const history = useHistory();

    const [activeKey, setActiveKey] = useState(activeCategory.id);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(givenProducts);
    }, [givenProducts])

    useEffect(() => {
        setActiveKey(activeCategory.id);
    }, [activeCategory])

    const categorySelect = (category) => {
        pushLinksToHistory ? history.push(`${pushLinksToHistory}/${category.slug}`) : setActiveKey(category.id);
    }

    const productsToDisplay = () => {
        if (!products)
            return [];
        else
            return activeKey === 0 ? products : products.filter(p => +p.category_id === activeKey)
    };

    return (
        <Fragment>
            <Row className="pb-3">
                <Col>
                    <Nav pills>
                        {categories.map(category =>
                            <NavItem className="cursor-pointer">
                                <NavLink onClick={() => categorySelect(category)}
                                         active={category.id === activeKey}>{category.name}</NavLink>
                            </NavItem>)
                        }
                    </Nav>
                </Col>
            </Row>
            {isLoading ? (
                <Row>
                    <Spinner color="primary" size="xl" style={{'margin': '0 auto'}}/>
                </Row>
            ) : (
                <Row style={{'justify-content': 'center'}}>
                    {
                        productsToDisplay().length > 0 ? productsToDisplay().map(product =>
                            <ProductCard
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                thumbnail={product.thumbnail_url}
                                price={product.price}
                                key={product.id}
                            />
                        ) : <Col>
                            <h3 className="py-5 text-center">{activeKey === 0 ? 'Nie znaleziono żadnych produktów.' : 'Nie znaleziono produktów w tej kategorii.'}</h3>
                        </Col>
                    }
                </Row>
            )}

        </Fragment>
    );
}