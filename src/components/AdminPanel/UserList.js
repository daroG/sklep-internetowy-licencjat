import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Row, Table} from "reactstrap";
import {MyContext, STATUS_ERROR, STATUS_SUCCESS} from "../../Context";
import UserEdit from "./UserEdit";
import {Logger} from "../../utils/Logger";

export default function UserList() {

    const {getUsers, updateUser} = useContext(MyContext);

    const [status, setStatus] = useState(0);
    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState({});
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getUsers().then(data => {
            if (data.status === STATUS_ERROR) {
                setStatus(2);
            } else {
                setStatus(1);
                Logger.info(data);
                setUsers(data.users);
            }
        })
    }, []);

    const toggle = () => setModal(!modal);

    const save = (userObject) => {
        updateUser(userObject).then((data) => {
            if(data.status === STATUS_SUCCESS){
                setStatus(3);
            }else{
                setStatus(4);
            }
            setModal(false);
        });
    }

    return (
        <div>
            {status === 2 ? (
                <Alert color="danger">Nie udało się załadować danych</Alert>
            ) : null}
            {status === 3 ? (
                <Alert color="success">Poprawnie zmieniono dane</Alert>
            ) : null}
            {status === 4 ? (
                <Alert color="warning">Nie udało się zapisać danych</Alert>
            ) : null}
            <Table>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Imię</th>
                    <th>Email</th>
                    <th>.</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td><Button color="warning" onClick={() => {toggle(); setUserToEdit(user);}}>Edytuj</Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {!!userToEdit ? <UserEdit user={userToEdit} modal={modal} toggle={toggle} save={save}/> : null}
        </div>
    )
}