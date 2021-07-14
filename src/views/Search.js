import React, {useContext, useEffect, useState} from 'react';
import {MyContext} from "../Context";
import { useParams} from "react-router-dom";
import {
    Container,
    Row,
    Col
} from "reactstrap";
import List from "../components/Product/List";
import {withRouter} from "react-router";


const getFiltered = (products, phrase) => {
    return products.filter(
        (product) => {
            let isPhrasePresent = false;
            ['name', 'description', 'price'].forEach((value) => {
                if (product.hasOwnProperty(value) && product[value].toString().toLowerCase().indexOf(phrase.toLowerCase()) > -1) {
                    isPhrasePresent = true;
                }
            });
            return isPhrasePresent;
        }
    );
}

function Search() {
    let {phrase} = useParams();

    const {getProducts} = useContext(MyContext);

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);


    useEffect(() => {
        (async () => {
            const products = await getProducts();

            setProducts(products);
        })();

    }, []);

    useEffect(() => {
        if(products) {

            const fProducts = getFiltered(products, phrase);

            setFilteredProducts(fProducts);
        }
    }, [phrase, products])


    return (
        <Container fluid="xl">
            <Row className="py-3">
                <Col>
                    <h2 className="text-center">Wyszukiwanie: <b>{phrase}</b></h2>
                </Col>
            </Row>
            <List products={filteredProducts}/>
        </Container>
    )
}

export default withRouter(Search);