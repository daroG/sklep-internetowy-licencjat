import React, {useContext, useState} from 'react';

import {Redirect, Link, useLocation, useHistory} from 'react-router-dom';

import {MyContext} from '../MyContext';
import {Alert, Form, Row, Col, Button, Container} from "react-bootstrap";

function LoginException({message, name,}){
    this.message = message;
    this.name = name;
}

function Login(){
    const {loginUser, rootState, isLoggedIn} = useContext(MyContext);

    const location = useLocation();
    const history = useHistory();

    const defaultState = {
        user:{
            email: '',
            pass: '',
        },
        successMsg: '',
        errorMsg: '',
    }

    const [state, setState] = useState(defaultState);

    const onChange = (e) => {
        setState({
            ...state,
            user: {
                ...state.user,
                [e.target.name]: e.target.value,
            }
        })
    }
    const formSubmit = async (event) => {
        event.preventDefault();

        setState({
            ...state,
            errorMsg: '',
            successMsg: '',
            isLoading: true,
        })

        try {
            let data = await loginUser({password: state.user.pass, email: state.user.email});

            if(!data || data.status === "ERROR"){
                throw new LoginException({message: "Błąd logowania", name: "LoginException"})
            }

            isLoggedIn().then(() => {
                if (data.status === "OK") {
                    history.push(location.state?.from?.pathname ? location.state.from.pathname : "/");
                }
            });
            setState({
                ...state,
                isLoading: false,
            })
        } catch (e){
            setState({
                ...state,
                errorMsg: !e.message ? "Błąd logowania" : e.message,
                isLoading: false
            })
        }


    }

    console.log();

    let success = !!state.successMsg ? <Alert variant="success">{state.successMsg}</Alert> : null;
    let error = !!state.errorMsg ? <Alert variant="danger">{state.errorMsg}</Alert> : null;
    let info = !!location?.state?.info ? <Alert variant="info">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
             className="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path
                d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        {location.state.info}
    </Alert> : null;

    if (!rootState.showLogin)
        return <Redirect to={location.state && location.state.from && location.state.from.pathname != null ? location.state.from.pathname : "/"}/>;
    else
        return (
            <Container>
                <Row>
                    <Col>
                        {info}
                    </Col>
                </Row>
                <Form>
                    <Form.Group controlId="email">
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" value={state.user.email} name="email" onChange={onChange}/>
                    </Form.Group>
                    <Form.Group controlId="pass">
                        <Form.Label>Hasło: </Form.Label>
                        <Form.Control type="password" value={state.user.pass} name="pass" onChange={onChange}/>
                    </Form.Group>
                    {success}
                    {error}
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                        <Button type="submit" variant="success" block onClick={formSubmit} disabled={state.isLoading}>
                            {state.isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : null}
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