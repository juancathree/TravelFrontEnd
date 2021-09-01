import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Place from 'components/Place';
import getPlaces from 'services/getPlaces';
import useApp from 'hooks/useApp';
import './styles.scss';

export default function City() {
   const { id } = useParams();
   const { places, setPlaces } = useApp();
   const history = useHistory();

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
         <div className="navegation">
            <FontAwesomeIcon
               icon={faArrowLeft}
               className="navegation__icon"
               size="2x"
               onClick={() => history.goBack()}
            />
            <h4 className="navegation__city">{id.toUpperCase()}</h4>
         </div>
         <div className="city__places">
            {places.map((place) => (
               <Place key={place.name} place={place} />
            ))}
         </div>
      </div>
   );
}
