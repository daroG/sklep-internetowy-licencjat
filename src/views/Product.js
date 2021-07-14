import Layout from "../components/Product/Layout";
import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {MyContext, STATUS_SUCCESS} from "../Context";
import ProductModel from "../models/Product";

export default function Product(props){

    const {productId} = useParams();

    const [product, setProduct] = useState({
        id: productId,
        name: "",
        price: 0,
        images: [],
        description: "",
        thumbnail: ""
    });

    const [count, setCount] = useState(1);

    const [prepositions, setPrepositions] = useState([]);

    const {rootState, getProduct, getProductPrepositions, getCart, addProductToCart} = useContext(MyContext);

    const findProductFromState = (id) => {
        return rootState.products.find(product => product.id === id);
    }

    useEffect(() => {
        let p = findProductFromState(productId);
        if(!p){
            getProduct(productId).then(product => {
                setProduct(product);
            })
        }else{
            setProduct(p);
        }

        getProductPrepositions({id: productId}).then(response => {
            if (response.status === STATUS_SUCCESS){
                setPrepositions(response.prepositions);
            }
        })

    }, [props]);

    const decrementCount = () => {
        setCount(prevCount => {
            if (prevCount > 0){
                return prevCount - 1;
            }
        });
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    }

    const handleAddToCartClick = () => {
        addProductToCart(new ProductModel(
            productId,
            product.name,
            product.thumbnail,
            product.price,
            count
        ))
    }

    return (
        <Layout
            id={productId}
            name={product.name}
            thumbnail={product.thumbnail}
            price={product.price} count={count}
            images={product.images}
            description={product.description}
            prepositions={prepositions}
            cart={getCart()}
            decrementCount={decrementCount}
            incrementCount={incrementCount}
            handleAddToCartClick={handleAddToCartClick}
        />
    )
}