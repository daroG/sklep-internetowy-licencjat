import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import {Carousel, Col, Container, InputGroup, FormControl} from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import {MyContext} from '../MyContext';

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
    }

    componentDidMount(){
        let id = this.state.id;
        let p = this.context.rootState.products.find(p => p.id == id);

        if(!p){
            this.context.getProduct(id).then(product => {
                this.setState({
                    ...this.state,
                    ...product
                }, () => console.log(product, this.state, this.state.images))
            });
        }else{

            this.setState({
                ...this.state,
                ...p
            }, () => console.log("Jest już załadowany", this.state, typeof this.state.images))
        }

        // setTimeout(() => log)
    }

    addToCard(product) {
        this.context.addProductToCart(product);
    }

    decrementCount(){
        if(this.state.count > 1)
            this.setState({
                ...this.state,
                count: this.state.count-1,
            })
    }

    incrementCount(){
        this.setState({
            ...this.state,
            count: this.state.count+1,
        })
    }


    render() {

        const {id, name, price, count, images, description, prepositions, product, thumbnail} = this.state;

        return (
            <Container fluid="xl">
                <Row className="my-5">
                    <Col>
                        <h1>{name}</h1>
                    </Col>
                </Row>
                <Row>
                    <Col className="mr-4 mb-4" md="6">
                        {images && images.length > 0 ? (
                        <Carousel>
                            {images.map(image => (<Carousel.Item>
                                <img className="d-block w-100" src={image}/>
                            </Carousel.Item>))}

                        </Carousel>
                        ) : <p>Brak zdjęcia poglądowego</p>}
                    </Col>
                    <Col className="ml-4">
                        <Row className="mb-5">
                            <Col>
                                <Badge pill variant="success" as="h2" style={{fontSize: "2rem"}}>{price / 100.0}zł</Badge>
                            </Col>
                        </Row>
                        <Row className="mb-5">
                            <Col md={4}>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button variant="primary" onClick={this.decrementCount}>-</Button>
                                    </InputGroup.Prepend>
                                    <FormControl type="text" className="text-center" value={count} readOnly={true}/>
                                    <InputGroup.Append>
                                        <Button variant="primary" onClick={this.incrementCount}>+</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col>
                                {!this.context.rootState.cart.find(p => p.id === this.state.id) ?
                                <Button variant="outline-primary" block onClick={this.addToCard.bind(null, {
                                    id: id,
                                    name: name,
                                    thumbnail: thumbnail,
                                    price: price,
                                    count: count,
                                })}>Dodaj do koszyka</Button> : <Button variant="outline-primary" block disabled={true} >Produkt znajduje się w koszyku</Button> }
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <h3>Informacje dodatkowe:</h3>
                                <Row>
                                    <Col lg="6">
                                        <p className="border-bottom">Dostawa do 4 dni roboczych</p>
                                    </Col>
                                    <Col lg="6">
                                        <p className="border-bottom">30 dni na zwrot</p>
                                    </Col>
                                    <Col lg="6">
                                        <p className="border-bottom">Darmowa dostawa od 250zł</p>
                                    </Col>
                                    <Col lg="6">
                                        <p className="border-bottom">2 lata gwarancji</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Inne produkty z tej kategorii:</h4>
                            </Col>
                        </Row>
                        <Row>
                            {prepositions.map((prep) =>
                                <Col>
                                    <Card>
                                        <Card.Img variant="top" src={prep.src}/>
                                        <Card.Body className="p-1">
                                            <Card.Text><Link to={prep.url}>{prep.name}</Link></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row className="my-5">
                    <Col lg={{span: 8, offset: 2}} dangerouslySetInnerHTML={{ __html: description}}>

                    </Col>
                </Row>
            </Container>
        )
    }
}

Product.contextType = MyContext;

export default Product;