import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './Marker.css'
import editIcon from '../../assets/edit.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMarkers } from '../../redux/markers/markerSlice';
import { NavLink } from 'react-router-dom';

const MarkerList = () => {


    const dispatch = useDispatch();
    const { markers, status, error } = useSelector((state) => state.markers);


    useEffect(() => {
        dispatch(fetchMarkers());
    }, [dispatch]);


    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='marker-container'>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>id</th>
                        <th>id передатчика</th>
                        <th>Широта</th>
                        <th>Долгота</th>
                        <th>Направление</th>
                        <th>Скорость</th>
                        <th>Водитель</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {
                        markers?.map(el => {
                            return (
                                <tr key={el.id}>
                                    <td>
                                        {el.id}
                                    </td>
                                    <td>
                                        {el.transmitter_id}
                                    </td>
                                    <td>
                                        {el.latitude}
                                    </td>
                                    <td>
                                        {el.longitude}
                                    </td>
                                    <td>
                                        {el.direction}
                                    </td>
                                    <td>
                                        {el.speed}
                                    </td>
                                    <td>
                                        {el.driver}
                                    </td>
                                    <td className='text-center'>
                                        <NavLink to={`/marker/${el.id}`}>
                                            <img width={20} src={editIcon} alt="" />
                                            </NavLink>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {/* <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr> */}
                </tbody>
            </Table>

        </div>
    );
};

export default MarkerList;