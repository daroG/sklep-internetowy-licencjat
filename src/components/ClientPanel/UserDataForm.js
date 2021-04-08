import React from "react";
import {FormFeedback, Input, FormGroup, Form, Label} from "reactstrap";
import {Button} from "reactstrap";
import {useForm} from "react-hook-form";

export default function UserDataForm({user, onSubmit}){

    const { register, handleSubmit, watch, errors } = useForm();

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label for="name">Imię:</Label>
                <Input type="text" defaultValue={user.name} name="name" id="name" invalid={!!errors.name} innerRef={register({required: true})}/>
                {errors.name ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="surname">Nazwisko:</Label>
                <Input type="text" defaultValue={user.surname} name="surname" id="surname" innerRef={register({required: true})} invalid={!!errors.surname}/>
                {errors.surname ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="email">Adres email:</Label>
                <Input type="email" defaultValue={user.email} name="email" id="email" innerRef={register({required: true})} invalid={!!errors.email}/>
                {errors.email ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="phone">Numer telefonu:</Label>
                <Input type="tel" defaultValue={user.phone} name="phone" id="phone" innerRef={register} invalid={!!errors.phone}/>
                {errors.phone ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="address">Adres</Label>
                <Input type="text" defaultValue={user.address} name="address" id="address" innerRef={register({required: true})} invalid={!!errors.address}/>
                {errors.address ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="city">Miasto</Label>
                <Input type="text" defaultValue={user.city} name="city" id="city" innerRef={register({required: true})} invalid={!!errors.city}/>
                {errors.city ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="zipCode">Kod pocztowy</Label>
                <Input type="text" defaultValue={user.zipCode} name="zipCode" id="zipCode" innerRef={register({required: true})} invalid={!!errors.zipCode}/>
                {errors.zipCode ? <FormFeedback>
                    To pole jest wymagane
                </FormFeedback> : null}
            </FormGroup>
            <Button color="primary" onClick={() => {}} type="submit">
                Zapisz zmiany
            </Button>
        </Form>
    )
}