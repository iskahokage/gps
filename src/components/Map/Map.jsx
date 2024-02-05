import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import marker from '../../assets/marker.png'
import { fetchMarkers } from '../../redux/markers/markerSlice';

const Map = ({ markers }) => {
    const position = [42.82, 74.61]
    const customIcon = new Icon({
        iconUrl: marker,
        iconSize: [38, 38]
    })

    if(!markers){
        fetchMarkers()
    }

    return (
        <MapContainer center={position} zoom={8} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                markers?.map(el => {
                    return (
                        <Marker key={el.id} position={[el.latitude, el.longitude]} icon={customIcon}>
                            <Popup>
                                <ul>
                                    <li>{el.transmitter_id}</li>
                                    <li>{el.driver}</li>
                                    <li>{el.latitude}</li>
                                    <li>{el.longitude}</li>
                                </ul>
                            </Popup>
                        </Marker>
                    )
                })
            }
        </MapContainer>
    );
};
export default Map;