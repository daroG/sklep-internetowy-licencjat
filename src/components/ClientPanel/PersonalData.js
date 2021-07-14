import React, {useContext, useEffect, useState} from 'react';
import {MyContext} from "../../Context";
import UserDataForm from "./UserDataForm";
import {Row, Spinner, Col, UncontrolledAlert} from "reactstrap";

function PersonalData() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [savingStatus, setSavingStatus] = useState(0);
    const {getUserInfo, updateUserInfo} = useContext(MyContext);

    useEffect(() => {
        getUserInfo().then(user => {
            if (user) {
                setUser(user);
            }
            setIsLoading(false);
        }).catch(() =>
            setIsLoading(false)
        );
    }, []);

    const handleSubmit = (data) => {
        updateUserInfo(data).then(result => {
            setSavingStatus(result ? 1 : 2);
        });
    }

    return isLoading ? <Row>
        <Col>
            <Spinner color="info" size="xl"/>
        </Col>
    </Row> : <Row>
        <Col className="mt-4">
            {savingStatus === 1 ? <UncontrolledAlert color="success">
                Zaktualizowano dane użytkownika
            </UncontrolledAlert> : savingStatus === 2 ? <UncontrolledAlert color="danger">
                Aktualizacja danych nie powiodła się
            </UncontrolledAlert> : null}
            <UserDataForm user={user} onSubmit={handleSubmit}/>
        </Col>
    </Row>;

}

export default PersonalData;