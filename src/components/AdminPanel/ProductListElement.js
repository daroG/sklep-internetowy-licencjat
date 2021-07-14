import React from 'react';
import {Button} from "reactstrap";


export default function ProductListElement({product, edit}) {
    return (
        <tr>
            <th scope="row">{product.id}</th>
            <td>{product.name}</td>
            <td>{product.category.name}</td>
            <td><Button color="warning" onClick={() => edit(product)}>Edytuj</Button></td>
        </tr>
    )
}