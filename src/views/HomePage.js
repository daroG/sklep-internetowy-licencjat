import React from 'react';
import {Container, Col, Row, Jumbotron, Button, UncontrolledCarousel} from "reactstrap";
import {NavLink} from "react-router-dom";

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

function HomePage() {

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
                            <NavLink to="/oferta/wszystkie">
                                <Button color="outline-primary" size="lg">
                                    Poznaj naszą ofertę
                                </Button>
                            </NavLink>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>

            <Row className="pb-5">
                <Col xs="12" className="mb-3">
                    <h4>A oto nasze przykładowe produkty:</h4>
                    <hr/>
                </Col>
                <Col xs="12">
                    <UncontrolledCarousel items={images}/>
                </Col>
            </Row>

            <Row className="bg-dark text-white py-5">
                <Col>
                    <p className="text-center">Jest to stona internetowa stworzona na potrzeby pracy licencjackiej.</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage;