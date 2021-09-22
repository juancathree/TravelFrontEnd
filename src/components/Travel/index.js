import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
   MapContainer,
   TileLayer,
   Marker,
   Popup,
   Polyline,
} from 'react-leaflet';
import useApp from 'hooks/useApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faArrowLeft,
   faAngleLeft,
   faAngleRight,
   faCircle,
   faMoneyCheckAlt,
   faMapMarkerAlt,
   faUserPlus,
   faEdit,
} from '@fortawesome/free-solid-svg-icons';
import Place from 'components/Place';
import './styles.scss';

export default function Travel() {
   const { travels } = useApp();
   const { id } = useParams();
   const tr = travels.find((t) => t['_id'] === id);

   const [state, setState] = useState({
      step: 0,
      waypoints: [],
      travel: tr,
      city: tr['city'],
      places: JSON.parse(window.localStorage.getItem(tr['city'])),
      routes: tr['routes'],
      day: new Date(tr['startDay']),
      // googleURL: '',
   });

   const history = useHistory();

   useEffect(() => {
      document.getElementById('menu').classList.add('disp-none');
   }, []);

   useEffect(
      () => () => {
         try {
            document.getElementById('menu').classList.remove('disp-none');
         } catch {}
      },
      []
   );

   const handleLeft = () => {
      var s = state.step;
      if (s === 0) return;
      var wp = state.routes[state.step - 1].map((route) => {
         var p = state.places.find((place) => place.name === route);
         return [p.location.coordinates[1], p.location.coordinates[0]];
      });
      var d = new Date(state.day);
      // var origin = wp[0];
      // var destination = wp[wp.length - 1];
      // var inter = wp.slice(1, wp.length - 2).join('|');
      setState({
         ...state,
         step: state.step - 1,
         waypoints: wp,
         day: new Date(d).setDate(d.getDate() - 1),
         // googleURL: `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${inter}&travelmode=walking`,
      });
   };

   const handleRight = () => {
      var s = state.step;
      if (s === state.routes.length - 1) return;
      var wp = state.routes[state.step + 1].map((route) => {
         var p = state.places.find((place) => place.name === route);
         return [p.location.coordinates[1], p.location.coordinates[0]];
      });
      var d = new Date(state.day);
      // var origin = wp[0];
      // var destination = wp[wp.length - 1];
      // var inter = wp.slice(1, wp.length - 2).join('|');
      setState({
         ...state,
         step: state.step + 1,
         waypoints: wp,
         day: new Date(d).setDate(d.getDate() + 1),
         // googleURL: `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${inter}&travelmode=walking`,
      });
   };

   return (
      <div className="travel__container">
         <div className="travel__back">
            <FontAwesomeIcon
               icon={faArrowLeft}
               className="travel__icon"
               size="2x"
               onClick={() => history.goBack()}
            />
            <h4 className="travel__id">
               {'Viaje a '.concat(state.city.toUpperCase())}
            </h4>
         </div>
         <MapContainer
            center={[
               state.places[0].location.coordinates[1],
               state.places[0].location.coordinates[0],
            ]}
            zoom={12}
            scrollWheelZoom={false}
         >
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
               url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {state.routes[state.step].map((route) => {
               return state.places
                  .filter((place) => route.includes(place.name))
                  .map((place) => (
                     <Marker
                        key={place.name}
                        position={[
                           place.location.coordinates[1],
                           place.location.coordinates[0],
                        ]}
                     >
                        <Popup>
                           <Place key={place.name} place={place} />
                        </Popup>
                     </Marker>
                  ));
            })}
            {state.waypoints.length > 0 && (
               <Polyline positions={state.waypoints} />
            )}
            {state.waypoints.length === 0 && (
               <div className="hidemap">
                  <h2 className="text">
                     No hay tiempo suficiente para ver algo
                  </h2>
               </div>
            )}
         </MapContainer>
         <div className="travel__leftmap">
            <FontAwesomeIcon
               icon={faAngleLeft}
               className="map__icon"
               size="2x"
               onClick={handleLeft}
            />
         </div>
         <div className="travel__rightmap">
            <FontAwesomeIcon
               icon={faAngleRight}
               className="map__icon"
               size="2x"
               onClick={handleRight}
            />
         </div>
         <div className="travel__mapindex">
            <ul>
               {state.routes.map((route, index) => {
                  if (index === state.step)
                     return (
                        <li key={index}>
                           {new Date(state.day).getDate() +
                              '/' +
                              new Date(state.day).getMonth()}
                        </li>
                     );
                  return (
                     <li key={index}>
                        <FontAwesomeIcon icon={faCircle} size="1x" />
                     </li>
                  );
               })}
            </ul>
         </div>
         <div className="travel__options">
            <div
               className="item"
               onClick={() => history.push('/travels/' + id + '/expenses')}
            >
               <FontAwesomeIcon
                  icon={faMoneyCheckAlt}
                  className="item__icon"
                  size="2x"
               />
               <h2 className="item__text">Gastos</h2>
            </div>
            <div
               className="item"
               onClick={() => history.push('/cities/' + state.city)}
            >
               <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  className="item__icon"
                  size="2x"
               />
               <h2 className="item__text">Lugares</h2>
            </div>
            <div
               className="item"
               onClick={() => history.push('/travels/' + id + '/edit')}
            >
               <FontAwesomeIcon
                  icon={faEdit}
                  className="item__icon"
                  size="2x"
               />
               <h2 className="item__text">Editar</h2>
            </div>
            <div
               className="item"
               onClick={() => history.push('/travels/' + id + '/invite')}
            >
               <FontAwesomeIcon
                  icon={faUserPlus}
                  className="item__icon"
                  size="2x"
               />
               <h2 className="item__text">Invitar</h2>
            </div>
         </div>
      </div>
   );
}
