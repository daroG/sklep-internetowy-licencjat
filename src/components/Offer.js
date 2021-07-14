import React, {useContext, useEffect, useState} from 'react';
import {MyContext} from "../Context";
import {Container} from "reactstrap";
import {Logger} from "../utils/Logger";
import categories from "../utils/Categories";
import List from "./Product/List";
import {useParams, withRouter} from "react-router";


function Offer(props) {
    const {section} = useParams();
    const context = useContext(MyContext);

    const [products, setProducts] = useState([]);
    const [activeKey, setActiveKey] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const cat = categories.find(cat => cat.slug === section);
        if(cat){
            setActiveKey(cat);
        }
        Logger.info(cat);

    }, [props])

    useEffect(() => {
        (async () => {
            let products = await context.getProducts();

            setProducts(products);
            setIsLoading(false);
        })();

    }, []);

    return (
        <Container fluid="xl">
            <List products={products} activeCategory={activeKey} pushLinksToHistory='/oferta' isLoading={isLoading}/>
        </Container>
    )
}

export default withRouter(Offer);