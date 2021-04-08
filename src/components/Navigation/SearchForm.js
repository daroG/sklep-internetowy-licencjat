import {Button, Form, Input, InputGroup, InputGroupAddon} from "reactstrap";
import React from "react";

export default function SearchForm() {
    return (
        <Form inline>
            <InputGroup>
                <Input type="text" placeholder="Szukaj w sklepie..."/>
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" type="submit">Szukaj</Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    )
}