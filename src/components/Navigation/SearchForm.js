import {Button, Form, Input, InputGroup, InputGroupAddon} from "reactstrap";
import React, {useState} from "react";
import {Logger} from "../../utils/Logger";
import { useHistory } from "react-router-dom";

export default function SearchForm() {

    let history = useHistory();

    const [text, setText] = useState("");

    const performSearch = (event) => {
        event.preventDefault();
        Logger.info(text);

        const generatedPath = `/szukaj/${text}`;

        history.push(generatedPath);
    }

    return (
        <Form inline onSubmit={performSearch}>
            <InputGroup>
                <Input type="text" placeholder="Szukaj w sklepie..." value={text} onChange={(event) => setText(event.target.value)}/>
                <InputGroupAddon addonType="prepend">
                    <Button color="primary" type="submit">Szukaj</Button>
                </InputGroupAddon>
            </InputGroup>
        </Form>
    )
}