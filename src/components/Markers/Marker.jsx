import React, { useEffect, useState } from 'react';
import './Marker.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkerById } from '../../redux/markers/markerSlice';
import { fetchDrivers } from '../../redux/drivers/driverSlice';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { patchData } from '../../helpers/api';
import { handleAlert } from '../../helpers/helpers';

const Marker = () => {

    const { id } = useParams();
    const { selectedMarker, status, error } = useSelector((state) => state.markers);
    const { drivers } = useSelector(state => state.drivers)
    const [selectedDriver, setSelectedDriver] = useState()
    const [alert, setAlert] = useState({
        visible: false,
        variant: '',
        msg: ''
    });


    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            dispatch(fetchMarkerById(id));
        }
        dispatch(fetchDrivers())
    }, [dispatch, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            ...selectedMarker,
            driver: selectedDriver
        }
        const {status, msg} =  await patchData(`/main_app/item/${id}/`, data)
        console.log(status, msg)
        handleAlert(status, setAlert, msg)
    }

    

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='marker-container'>
            <Alert variant={alert.variant} show={alert.visible} dismissible>
                <Alert.Heading>{alert.msg}</Alert.Heading>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <h2>Передатчик</h2>
                    <Form.Group as={Col} md="6">
                        <Form.Label>Выберите водителя</Form.Label>
                        <Form.Select onChange={e => setSelectedDriver(e.target.value)}>
                            <option hidden>Выберите водителя</option>
                            {drivers.map(el => {
                                return (
                                    <option selected={selectedMarker?.driver === el.id ? true : false} value={el.id} key={el.id} className='d-flex justify-content-between'><p>{el.fio}</p> <p>{el.car_number}</p></option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button type="submit">Сохранить маркер</Button>
            </Form>

        </div>
    );
};

export default Marker;