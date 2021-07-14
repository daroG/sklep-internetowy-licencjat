import React, {useContext, useState} from 'react';

import {Redirect, useLocation, useHistory, Link} from 'react-router-dom';
import {Alert, Form, Row, Col, Button, Container, FormGroup, Label, Input, Spinner} from 'reactstrap';
import {MyContext} from '../Context';
import {Logger} from "../utils/Logger";

const STATUS_SUCCESS = 1;
const STATUS_NOT_PROCESSED = 0;
const STATUS_ERROR = 2;

const MSG_UNAUTHORIZED = "Email lub hasło są niepoprawne.";
const MSG_LOGGED = "Zalogowano poprawnie.";

const REDIRECT_TO_AFTER_LOGIN = "/panel-klienta";

function Login(){
    const {loginUser, rootState, isLoggedIn} = useContext(MyContext);

    const location = useLocation();
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [currentStatus, setCurrentStatus] = useState(STATUS_NOT_PROCESSED);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value);
        }else if(e.target.name === 'pass'){
            setPassword(e.target.value);
        }
    }

    const formSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        let data = await loginUser({password: password, email: email});

        if(data.status !== 'Success') {
            setCurrentStatus(STATUS_ERROR);
            setErrorMessage(MSG_UNAUTHORIZED);

            setIsLoading(false);
            return;
        }

        Logger.info(data);

        isLoggedIn().then((value) => {
            if(value){
                setCurrentStatus(STATUS_SUCCESS);
                setSuccessMessage(MSG_LOGGED);
                setTimeout(() => {
                    history.push(location.state?.from?.pathname ? location.state.from.pathname : REDIRECT_TO_AFTER_LOGIN);
                }, 2000);
            }else{
                setCurrentStatus(STATUS_ERROR);
                setErrorMessage(MSG_UNAUTHORIZED);
            }
        });

        setIsLoading(false);

    }

    let info = !!location?.state?.info ? (<Alert color="info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        {location.state.info}
    </Alert>) : null;

    if (!rootState.showLogin)
        return <Redirect to={location.state && location.state.from && location.state.from.pathname != null ? location.state.from.pathname : REDIRECT_TO_AFTER_LOGIN}/>;
    else
        return (
            <Container>
                <Row>
                    <Col>
                        {info}
                    </Col>
                </Row>
                <Form>
                    <FormGroup>
                        <Label for="email">Email: </Label>
                        <Input type="email" value={email} name="email" id="email" onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="pass">Hasło: </Label>
                        <Input type="password" value={password} name="pass" id="pass" onChange={onChange}/>
                    </FormGroup>
                    {currentStatus === STATUS_SUCCESS ? (
                        <Alert color="success">{successMessage}</Alert>
                    ) : null}
                    {currentStatus === STATUS_ERROR ? (
                        <Alert color="danger">{errorMessage}</Alert>
                    ) : null}
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                        <Button type="submit" color="success" block onClick={formSubmit} disabled={isLoading}>
                            {isLoading ? <Spinner size="sm" color="light"/> : null}
                            Zaloguj się
                        </Button>
                        <p className="mt-3">Nie masz konta? <strong><Link to="/rejestracja">Zarejestruj się</Link></strong></p>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )


}

export default Login;