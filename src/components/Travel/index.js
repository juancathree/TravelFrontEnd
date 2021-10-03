import { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
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
   faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Place from 'components/Place';
import './styles.scss';

export default function Travel() {
   const { currentTravel, places } = useApp();

   const [state, setState] = useState({
      step: 0,
      waypoints: currentTravel['routes'][0].map((route) => {
         var p = places.find((place) => place.name === route);
         return [p.location.coordinates[1], p.location.coordinates[0]];
      }),
      day: new Date(currentTravel['startDay']),
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
      if (state.step === 0) return;
      var d = new Date(state.day);
      setState({
         ...state,
         step: state.step - 1,
         waypoints: currentTravel['routes'][state.step - 1].map((route) => {
            var p = places.find((place) => place.name === route);
            return [p.location.coordinates[1], p.location.coordinates[0]];
         }),
         day: new Date(d).setDate(d.getDate() - 1),
      });
   };

   const handleRight = () => {
      if (state.step === currentTravel['routes'].length - 1) return;
      var d = new Date(state.day);
      setState({
         ...state,
         step: state.step + 1,
         waypoints: currentTravel['routes'][state.step + 1].map((route) => {
            var p = places.find((place) => place.name === route);
            return [p.location.coordinates[1], p.location.coordinates[0]];
         }),
         day: new Date(d).setDate(d.getDate() + 1),
      });
   };

   const handleDeleteClick = () => {
      setState({ ...state, click: true });
   };

   const handleDelete = () => {
      setState({ ...state, click: false });
      console.log('eliminado');
   };

   return (
      <Fragment>
         <div className="travel__container">
            <div className="travel__back">
               <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="travel__icon"
                  size="2x"
                  onClick={() => history.goBack()}
               />
               <h4 className="travel__id">
                  {'Viaje a '.concat(currentTravel['city'].toUpperCase())}
               </h4>
               <FontAwesomeIcon
                  icon={faTrash}
                  className="travel__icon"
                  size="2x"
                  onClick={handleDeleteClick}
               />
            </div>
            <MapContainer
               center={[
                  places[0].location.coordinates[1],
                  places[0].location.coordinates[0],
               ]}
               zoom={12}
               scrollWheelZoom={false}
            >
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
               />
               {currentTravel['routes'][state.step].map((route) => {
                  return places
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
                  {currentTravel['routes'].map((route, index) => {
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
                           <FontAwesomeIcon
                              className="circle-day"
                              icon={faCircle}
                              size="1x"
                           />
                        </li>
                     );
                  })}
               </ul>
            </div>
            <div className="travel__options">
               <div
                  className="item"
                  onClick={() =>
                     history.push(
                        '/travels/' + currentTravel['_id'] + '/expenses'
                     )
                  }
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
                  onClick={() =>
                     history.push('/cities/' + currentTravel['city'])
                  }
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
                  onClick={() =>
                     history.push('/travels/' + currentTravel['_id'] + '/edit')
                  }
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
                  onClick={() =>
                     history.push(
                        '/travels/' + currentTravel['_id'] + '/invite'
                     )
                  }
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
         <div className={state.click ? 'show-add' : 'hide-add'}>
            <div className="add-form">
               <h4 className="text">¿Borrar viaje?</h4>
               <button className="btn delete" onClick={handleDelete}>
                  <p>Eliminar</p>
               </button>
               <button
                  className="btn cancel"
                  onClick={() => setState({ ...state, click: false })}
               >
                  <p>Cancelar</p>
               </button>
            </div>
         </div>
      </Fragment>
   );
}
