import {
    Row,
    Col,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormGroup,
    Input,
    Label,
    ListGroup, ListGroupItem, CustomInput
} from "reactstrap";
import React, {useEffect, useState} from "react";
import {Logger} from "../../utils/Logger";
import {useForm} from "react-hook-form";


export default function UserEdit({user, modal, toggle, save}) {

    const {register, handleSubmit} = useForm();

    const [data, setData] = useState({id: user.id, name: user.name, email: user.email, password: '', role: user.role});

    const [isAdmin, setIsAdmin] = useState(user?.role?.role === 1);


    useEffect(() => {
        if (data.id !== user.id) {
            setData({id: user.id, name: user.name, email: user.email, password: '', role: user.role});
            setIsAdmin(user?.role?.role === 1)
        }
        Logger.info("user changed", user);
    }, [user]);

    const prepareDataForSubmitting = (givenData) => {

        let dataToSubmit = {};

        dataToSubmit['id'] = data.id;

        ['name', 'email', 'password'].forEach(attr => {
            if (givenData[attr] !== data[attr] && givenData[attr].trim() !== '') {
                dataToSubmit[attr] = givenData[attr];
            }
        })

        if (isAdmin !== !!data.role.role) {
            dataToSubmit['is_admin'] = isAdmin;
        }

        return dataToSubmit;
    }

    const handleSave = (actualData) => {
        Logger.info(actualData);
        Logger.info("Prepared", prepareDataForSubmitting(actualData));
        save(prepareDataForSubmitting(actualData))
    }

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop={true} keyboard={true} className={'modal-lg'}>
            <Form onSubmit={handleSubmit(handleSave)}>
                <ModalHeader toggle={toggle}>Edycja użytkownika</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Nazwa</Label>
                        <Input type="text" id="name" placeholder="Nazwa użytkownika" name="name"
                               defaultValue={data.name} innerRef={register()}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email użytkownika" name="email"
                               defaultValue={data.email} innerRef={register()}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Hasło</Label>
                        <Input type="password" id="password" name="password"
                               placeholder="Hasło użytkownika - puste nie zostanie zmienione"
                               defaultValue={data.password} innerRef={register()}/>
                    </FormGroup>
                    <FormGroup>
                        <CustomInput id="is_admin" name="isAdmin" checked={isAdmin}
                                     onChange={(e) => setIsAdmin(e.target.checked)} type="checkbox"
                                     innerRef={register()}
                                     label={`Ma prawa administratora (obecnie ${user?.role?.role === 1 ? 'Tak' : 'Nie'})`}/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="primary">Zapisz</Button>{' '}
                    <Button type="button" color="secondary" onClick={toggle}>Anuluj</Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}