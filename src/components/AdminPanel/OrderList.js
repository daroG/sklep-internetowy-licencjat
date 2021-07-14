import React, {useContext, useEffect, useState} from 'react';
import {MyContext, STATUS_SUCCESS} from "../../Context";
import {Table, Alert, Button, Col, Row, Spinner} from "reactstrap";
import OrderListElement from "./OrderListElement";
import {Logger} from "../../utils/Logger";


export default function OrderList() {

    const {getAllOrders, updateOrder} = useContext(MyContext);

    const [orders, setOrders] = useState([]);

    const [sorting, setSorting] = useState('id');

    const [ascending, setAscending] = useState(true);

    //0 - nothing
    //1 - success
    //2 - error
    const [loadingStatus, setLoadingStatus] = useState(0);


    //0 - nothing
    const [updatingStatus, setUpdatingStatus] = useState(0);

    useEffect(() => {
        getAllOrders().then((data) => {
            Logger.info(data);
            if (data.status === STATUS_SUCCESS) {
                setOrders(data.orders);
                setLoadingStatus(1);
            } else {
                setLoadingStatus(2);
            }
        })
    }, []);

    const updateStatus = (order) => {

        setUpdatingStatus(3);
        updateOrder({id: order.id, status: order.status}).then((data) => {
            if (data.status === STATUS_SUCCESS){
                setOrders(prevOrders => (
                    prevOrders.map(pOrder => {
                        if(pOrder.id === order.id) {
                            return {...pOrder, status: order.status}
                        }
                        return pOrder;
                    })
                ));
                setUpdatingStatus(1);
            }else{
                setUpdatingStatus(2);
            }
        })


    }

    const sort = (sortName) => {
        Logger.info('clicked', sortName);
        if (sortName === sorting){
            setAscending(wasAscending => (!wasAscending))
            Logger.info('setAscending')
        }else{
            setSorting(sortName);
            setAscending(false);
            Logger.info('setSorting and setAscending')
        }

        setOrders(prevOrders => (prevOrders.sort((a, b) => {
            const t = a[sorting] === b[sorting] ? 0 : (a[sorting] < b[sorting] ? -1 : 1);
            return ascending ? t : -t;
        })))

        Logger.info('data: ', {sorting: sorting, ascending: ascending});
    }

    return (
        <Row>
            <Col className="mt-3">
                {loadingStatus === 0 ? (
                    <Row>
                        <Col>
                            <Spinner color="info" size="xl"/>
                        </Col>
                    </Row>
                ) : (loadingStatus === 2 ? (
                    <Alert color="danger">Nie udało się załadować zamówień</Alert>
                ) : null)}

                {updatingStatus === 3 ? (
                    <Spinner color="info" size="xl"/>
                ) : null}

                {updatingStatus === 2 ? (
                    <Alert color="danger">Nie udało się zaktualizować zamówienia</Alert>
                ) : null}
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                            <tr>
                                <th onClick={() => sort('name')} className='cursor-pointer'>Imię</th>
                                <th onClick={() => sort('surname')} className='cursor-pointer'>Nazwisko</th>
                                <th onClick={() => sort('email')} className='cursor-pointer'>Email</th>
                                <th onClick={() => sort('created_at')} className='cursor-pointer'>Data złożenia</th>
                                <th onClick={() => sort('status')} className='cursor-pointer'>Status</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) =>
                                <OrderListElement order={order} key={order.id} updateStatus={updateStatus}/>
                            )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

}