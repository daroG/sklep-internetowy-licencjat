import React, {useContext, useState} from 'react';
import {Label, Input, Form, FormGroup, Container, Button, Alert} from 'reactstrap';
import {MyContext} from "../Context";
import {Logger} from "../utils/Logger";

function Register(){
    const {registerUser} = useContext(MyContext);
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
                [e.target.name.replace('first_name', 'name').replace('last_name', 'surname')]: e.target.value,
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
                Logger.info(data);
                setState({
                    ...state,
                    success: true
                })
            }).catch(err => {
                Logger.error(err);
                setState({
                    ...state,
                    errors: err.response.data.errors
                })
            })

    }


    return (
        <Container>
            <h1>Aby się zarejestrować, podaj dane do swojego konta:</h1>
            {state.success ? <Alert color={"success"}>Poprawnie zarejestrowano użytkownika</Alert> : null}
            {state.errors.length > 0 ? <Alert color={"warning"}>
                <ul>
                    {state.errors.map(error => <li key={error}>{error}</li>)}
                </ul>
                </Alert> : null}
            <Form>
                <FormGroup>
                    <Label for="first_name">Imię</Label>
                    <Input id="first_name" value={state.user.name} name="first_name" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="surname">Nazwisko</Label>
                    <Input id="surname" value={state.user.surname} name="last_name" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" value={state.user.email} name="email" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Hasło</Label>
                    <Input id="password" value={state.user.password} name="password" type="password" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="passwordConfirm">Powtórz hasło</Label>
                    <Input id="passwordConfirm" value={state.user.passwordConfirm} name="passwordConfirm" type="password" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="tel">Numer telefonu</Label>
                    <Input id="tel" type="tel" value={state.user.tel} name="tel" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Adres</Label>
                    <Input id="address" value={state.user.address} name="address" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="city">Miasto</Label>
                    <Input id="city" value={state.user.city} name="city" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="zipCode">Kod pocztowy</Label>
                    <Input id="zipCode" value={state.user.zipCode} name="zipCode" onChange={onChange}/>
                </FormGroup>
                <Button onClick={formSubmit} color="primary">
                    Zarejestruj się
                </Button>
            </Form>
        </Container>
    )

}

export default Register;