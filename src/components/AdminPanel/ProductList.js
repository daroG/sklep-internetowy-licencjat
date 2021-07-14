import {Alert, Button, Row, Col, Table} from 'reactstrap';

import React, {useContext, useEffect, useState} from "react";
import {MyContext, STATUS_SUCCESS} from "../../Context";
import ProductListElement from "./ProductListElement";
import ProductEdit from "./ProductEdit";
import {Logger} from "../../utils/Logger";


export default function ProductList(){

    const {getProducts, getProductsCategories, saveProduct, changeProductThumbnail} = useContext(MyContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [productToEdit, setProductToEdit] = useState(null);

    const [modal, setModal] = useState(false);

    //0 - nothing
    //1 - success
    //2 - error
    const [status, setStatus] = useState(0);

    useEffect(() => {
        getProducts().then(products => setProducts(products));
        getProductsCategories().then(categories => setCategories(categories));
    }, [status])

    const toggle = () => setModal(!modal);

    const editProduct = (product) => {
        setProductToEdit(product);
        toggle();
    }

    const save = (product, files) => {
        saveProduct({
            ...product,
            category_id: product.category,
            files: files.map(file => file.serverId)
        }).then(obj => {
            if(obj.status === "Success") {
                setProducts(products)
                setStatus(1);
            }
            else
                setStatus(2);

            toggle();
            setTimeout(() => setStatus(0),5000);
        });
    }

    const updateThumbnail = (productId, thumbnailMediaId) => {
        changeProductThumbnail(productId, thumbnailMediaId).then(data => {
            if(data.status === STATUS_SUCCESS){
                setProducts(prevProducts => (prevProducts.map(product => {
                        return (product.id === productId) ? data.product : product
                })))
                setProductToEdit(data.product);
            }
        })
    }

    return (
        <Row>
            <Col className="mt-3">
                {status === 1 ? (
                    <Alert color="success">Dane zostały zapisane</Alert>
                ) : (status === 2 ? (
                    <Alert color="danger">Nie udało się zapisać danych</Alert>
                ) : null)}
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nazwa</th>
                                    <th>Kategoria</th>
                                    <th><Button color="success" onClick={() => editProduct({id: -1, name: '', price: '', description: '', category_id: 1})}>Dodaj nowy produkt</Button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) =>
                                    <ProductListElement product={product} edit={editProduct} key={product.id}/>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
            {!!productToEdit ? <ProductEdit product={productToEdit} categories={categories} modal={modal} toggle={toggle} save={save} changeThumbnail={updateThumbnail}/> : null}
        </Row>
    );
}