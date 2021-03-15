import React from 'react';
import {Container, Col, Row, Carousel} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";


function HomePage(props) {

    const images = [
        {
            src: 'http://sklep-internetowy.loc/public/images/1.png',
            alt: '',
        },
        {
            src: 'http://sklep-internetowy.loc/public/images/2.png',
            alt: '',
        },
        {
            src: 'http://sklep-internetowy.loc/public/images/3.jpg',
            alt: '',
        },
        {
            src: 'http://sklep-internetowy.loc/public/images/4.jpg',
            alt: '',
        },
    ]

    return (
        <Container fluid="xl">
            <Row>
                <Col>
                    <Jumbotron className="mt-5">
                        <h1>
                            Witaj na naszej stronie głównej!
                        </h1>
                        <p className="text-lead">Nasz sklep internetowy oferuje wyjątkowe rękodzieło. Każdy z naszych produktów jest unikatowy i tworzony z najwyższej jakości naturalnych materiałów.
                            </p>
                        <p>W ofercie znajdują się <strong>makramy, łapacze snów, ozdoby na lustra, biżuteriaz, serwetki, ozdoby na donice oraz innego rodzaju wyroby.</strong></p>
                        <p>Nasze produkty doskonale sprawdzają się jako prezenty, każdy z nich może zostać zmodyfikowny na życzenie klienta.</p>


                        <p>
                            <NavLink to="/oferta">
                                <Button variant="outline-primary" size="lg">
                                    Poznaj ofertę
                                </Button>
                            </NavLink>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>

            <Row>
                <Col xl={{span: 6, offset: 3}}>
                    <Carousel>
                        {images.map(image => (<Carousel.Item>
                            <img className="d-block w-100" src={image.src}
                                 alt={image.alt}/>
                        </Carousel.Item>))}

                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;