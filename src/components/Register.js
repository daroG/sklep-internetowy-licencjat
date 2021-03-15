import React, {useContext, useState} from 'react';
import {Form, Container} from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {MyContext} from "../MyContext";
import Alert from "react-bootstrap/Alert";

function Register(){
    const {rootState, registerUser} = useContext(MyContext);
    const defaultState = {
        user: {
            name: "",
            surname: "",
            email: "",
            tel: "",
            address: "",
            city: "",
            zipCode: "",
            password: "",
            passwordConfirm: ""
        },
        errors: [],
        success: null
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

    const addError = (error) => {
        setState({
            ...state,
            errors: [...state.errors, error]
        })
    }

    const formSubmit = (e) => {
        e.preventDefault();


        setState({
            ...state,
            errors: []
        })

        const {user} = state;

        let canProcess = true;
        if(user.password.length < 5){
            canProcess = false;
            addError("Podane hasło jest za krótkie");
        }

        if(user.password !== user.passwordConfirm){
            canProcess = false;
            addError("Podane hasła różnią się od siebie");
        }

        //The rest of validation...

        if(canProcess)
            registerUser(user).then(data => {
                console.log(data);
                if (data.errors.length > 0) {
                    setState({
                        ...state,
                        errors: data.errors
                    })
                }else if(data.status === "OK"){
                    setState({
                        ...state,
                        success: true
                    })
                }
            })

    }


    return (
        <Container>
            <h1>Aby się zarejestrować, podaj dane do swojego konta:</h1>
            {state.success ? <Alert variant={"success"}>Poprawnie zarejestrowano użytkownika</Alert> : null}
            {state.errors.length > 0 ? <Alert variant={"warning"}>
                <ul>
                    {state.errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                </Alert> : null}
            <Form>
                <Form.Group controlId="name">
                    <Form.Label>Imię</Form.Label>
                    <Form.Control value={state.user.name} name="name" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control value={state.user.surname} name="surname" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={state.user.email} name="email" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control value={state.user.password} name="password" type="password" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="passwordConfirm">
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control value={state.user.passwordConfirm} name="passwordConfirm" type="password" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="tel">
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control type="tel" value={state.user.tel} name="tel" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="address">
                    <Form.Label>Adres</Form.Label>
                    <Form.Control value={state.user.address} name="address" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control value={state.user.city} name="city" onChange={onChange}/>
                </Form.Group>
                <Form.Group controlId="zipCode">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control value={state.user.zipCode} name="zipCode" onChange={onChange}/>
                </Form.Group>
                <Button onClick={formSubmit}>
                    Zarejestruj się
                </Button>
            </Form>
        </Container>
    )

}

export default Register;