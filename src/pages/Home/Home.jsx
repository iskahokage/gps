import React from 'react';
import './Home.css';
import Map from '../../components/Map/Map';
import { useSelector } from 'react-redux';

const Home = () => {
    
    const { markers, status, error } = useSelector((state) => state.markers);

    return (
        <div className='map-container'>
            <Map markers={markers}/>
        </div>
    );
};

export default Home;