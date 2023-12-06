import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Driver.css'
import axios from 'axios';
import { baseUrl, postData } from '../../helpers/api';

const Driver = () => {


    const [validated, setValidated] = useState(false);

    const [FIO, setFIO] = useState({});
    const [carNumber, setCarNumber] = useState({})
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);
        const fio = Object.values(FIO).join(' ');
        const car_number = carNumber.region + 'KG' + carNumber.number + carNumber.series
        const data = {
            fio,
            car_number
        }
        const response = await postData('/main_app/driver/', data)
        console.log(response)
    };

    const handleFIO = (e) => {
        const value = e.target.value;
        const name = e.target.name
        console.log(e)

        setFIO(prev => ({
            ...prev,
            [name]:value.trim()
        }))
    }
    const handleCarNumber = (e) => {
        const value = e.target.value;
        const name = e.target.name
        console.log(e)

        setCarNumber(prev => ({
            ...prev,
            [name]:value.trim()
        }))
    }

    return (

        <div className='driver-container'>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <h2>Водитель</h2>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control
                            required
                            name='lastName'
                            type="text"
                            onChange={handleFIO}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите фамилию
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control
                            required
                            name='firstName'
                            type="text"
                            onChange={handleFIO}
                        />
                        <Form.Control.Feedback type="invalid">
                            Введите имя
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Отчество</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                name='middleName'
                                onChange={handleFIO}
                            />
                            <Form.Control.Feedback type="invalid">
                                Введите отчество
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <h2>Номер авто</h2>
                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Регион</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="text"
                                placeholder="08"
                                name='region'
                                required
                                onChange={handleCarNumber}
                            />
                            <InputGroup.Text id="inputGroupPrepend">KG</InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                Введите регион
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>Номер</Form.Label>
                        <Form.Control type="text" placeholder="123" required
                            name='number' 
                            onChange={handleCarNumber} />
                        <Form.Control.Feedback type="invalid">
                            Введите номер
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Серия</Form.Label>
                        <Form.Control type="text" placeholder="AAA" required
                            name='series' 
                            onChange={handleCarNumber} />
                        <Form.Control.Feedback type="invalid">
                            Введите серию
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Создать водителя</Button>
            </Form>

        </div>
    );
};

export default Driver;