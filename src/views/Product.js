import React, {Component} from 'react';
import {MyContext} from '../MyContext';
import ProductModel from "../models/Product";
import Layout from "../components/Product/Layout";
import {Logger} from "../utils/Logger";

class Product extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.productId,
            name: "",
            price: 0,
            images: [],
            description: "",
            thumbnail: "",
            count: 1,
            prepositions: [
                {
                    src: 'http://via.placeholder.com/550',
                    name: 'Produkt 2',
                    url: '/produkt/1',
                },
                {
                    src: 'http://via.placeholder.com/550',
                    name: 'Produkt 3',
                    url: '/produkt/1',
                },
                {
                    src: 'http://via.placeholder.com/550',
                    name: 'Produkt 4',
                    url: '/produkt/1',
                },
                {
                    src: 'http://via.placeholder.com/550',
                    name: 'Produkt 5',
                    url: '/produkt/1',
                },

            ]
        }

        this.addToCard = this.addToCard.bind(this);
        this.incrementCount = this.incrementCount.bind(this);
        this.decrementCount = this.decrementCount.bind(this);
        this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
    }

    componentDidMount() {
        let id = this.state.id;
        let p = this.context.rootState.products.find(p => p.id === id);

        if (!p) {
            this.context.getProduct(id).then(product => {
                this.setState({
                    ...this.state,
                    ...product
                }, () => console.log(product, this.state, this.state.images))
            });
        } else {

            this.setState({
                ...this.state,
                ...p
            }, () => console.log("Jest już załadowany", this.state, typeof this.state.images))
        }
    }

    addToCard(product) {
        this.context.addProductToCart(product);
    }

    decrementCount() {
        if (this.state.count > 1)
            this.setState({
                ...this.state,
                count: this.state.count - 1,
            })
    }

    incrementCount() {
        this.setState((state) => ({
            count: state.count + 1,
        }))
    }

    handleAddToCartClick() {
        this.addToCard(new ProductModel(
            this.state.id,
            this.state.name,
            this.state.thumbnail,
            this.state.price,
            this.state.count
        ))
    }

    render() {

        const {id, name, price, count, images, description, prepositions, thumbnail} = this.state;

        return <Layout
            id={id}
            name={name}
            thumbnail={thumbnail}
            price={price} count={count}
            images={images}
            description={description}
            prepositions={prepositions}
            cart={this.context.getCart()}
            decrementCount={this.decrementCount}
            incrementCount={this.incrementCount}
            handleAddToCartClick={this.handleAddToCartClick}
        />;

    }
}

Product.contextType = MyContext;

export default Product;