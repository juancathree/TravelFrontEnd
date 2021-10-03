import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApp from 'hooks/useApp';
import { useHistory } from 'react-router-dom';
import { IKImage } from 'imagekitio-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';
import getTravels from 'services/getTravels';

export default function Travels() {
   const { travels, setTravels, setCurrentTravel, setPlaces } = useApp();
   const history = useHistory();

   const handleAdd = (e) => {
      e.preventDefault();
      history.push('/newtravel');
   };

   useEffect(() => {
      getTravels()
         .then((data) => {
            window.localStorage.setItem('travels', JSON.stringify(data));
            setTravels(data);
         })
         .catch((error) => {
            setTravels(JSON.parse(window.localStorage.getItem('travels')));
         });
   }, [setTravels]);

   return (
      <div className="container">
         <h3 className="travels">Viajes</h3>
         {travels.length !== 0 && (
            <div className="travels__container">
               {travels.map((travel) => (
                  <Link
                     key={travel['startDay']}
                     className="travels__item"
                     to={'/travels/'.concat(travel['_id'])}
                     onClick={() => {
                        setCurrentTravel(travel);
                        setPlaces(
                           JSON.parse(
                              window.localStorage.getItem(travel['city'])
                           )
                        );
                     }}
                  >
                     <IKImage
                        path={travel['city'] + '.webp'}
                        loading="lazy"
                        className="travels__img"
                     />
                     <div className="travels__info">
                        <h2 className="travels__title">
                           {travel['city'].toUpperCase()}
                        </h2>
                        <p className="travels__days">
                           {new Date(travel['startDay']).toLocaleDateString()} -{' '}
                           {new Date(travel['endDay']).toLocaleDateString()}
                        </p>
                     </div>
                  </Link>
               ))}
            </div>
         )}
         {travels.length === 0 && (
            <h4 className="empty-travels">No tienes ningun viaje</h4>
         )}
         <button className="btn-add" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            <p>Crear viaje</p>
         </button>
      </div>
   );
}
