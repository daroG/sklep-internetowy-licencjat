import {
    Col,
    Row,
    Button,
    Badge,
    Card,
    CardBody,
    CardImg,
    CardText,
    Container,
    Input,
    InputGroup,
    InputGroupAddon,
    UncontrolledCarousel
} from "reactstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Helpers from "../../Helpers";

function Layout({id, name, price, count, description, images, decrementCount, incrementCount, handleAddToCartClick, prepositions, cart}) {

    const [carouselItems, setCarouselItems] = useState([]);

    useEffect(() => {
        setCarouselItems(images.map((image, index) => {
            return {
                src: image,
                key: index
            }
        }));
    }, [images])

    return (
        <Container fluid="xl">
            <Row className="my-5">
                <Col>
                    <h1>{name}</h1>
                </Col>
            </Row>
            <Row>
                <Col className="mr-4 mb-4" md="6">
                    {carouselItems && carouselItems.length > 0 ? (<UncontrolledCarousel items={carouselItems}/>) : <p>Brak zdjęcia poglądowego</p>}
                </Col>
                <Col className="ml-4">
                    <Row className="mb-5">
                        <Col>
                            <Badge pill color="success" style={{fontSize: "2rem"}}>{Helpers.displayAsPrice(price)}zł</Badge>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col md={4}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button color="primary" onClick={decrementCount}>-</Button>
                                </InputGroupAddon>
                                <Input type="text" className="text-center" value={count} readOnly={true}/>
                                <InputGroupAddon addonType="append">
                                    <Button color="primary" onClick={incrementCount}>+</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                        <Col>
                            {!cart.find(p => p.id === id) ?
                                <Button color="outline-primary" block onClick={handleAddToCartClick}>Dodaj do koszyka</Button> :
                                <Button color="outline-primary" block disabled={true}>Produkt znajduje się w koszyku</Button>}
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
                                    <CardImg top src={prep.src}/>
                                    <CardBody className="p-1">
                                        <CardText><Link to={"/produkt/" + prep.id}>{prep.name}</Link></CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
            <Row className="my-5">
                <Col lg={{size: 8, offset: 2}}>
                    <div dangerouslySetInnerHTML={{__html: description}}/>
                </Col>
            </Row>
        </Container>
    );
}

export default Layout;