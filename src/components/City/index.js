import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Place from 'components/Place';
import getPlaces from 'services/getPlaces';
import useApp from 'hooks/useApp';
import './styles.css';

export default function City() {
   const { id } = useParams();
   const { places, setPlaces } = useApp();

   useEffect(() => {
      getPlaces(id)
         .then((data) => {
            window.localStorage.setItem('places', JSON.stringify(data));
            setPlaces(data);
         })
         .catch((error) => {
            setPlaces(JSON.parse(window.localStorage.getItem('places')));
         });
   }, [id, setPlaces]);

   return (
      <div className="city__container">
         <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
         >
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
               <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
            </Marker>
         </MapContainer>
         <div className="city__places">
            {places.map((place) => (
               <Place place={place} />
            ))}
         </div>
      </div>
   );
}
