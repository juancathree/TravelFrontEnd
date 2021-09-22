import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Place from 'components/Place';
import getPlaces from 'services/getPlaces';
import useApp from 'hooks/useApp';
import './styles.scss';

export default function City() {
   const { id } = useParams();
   const { places, setPlaces } = useApp();
   const history = useHistory();

   const handleAdd = (e) => {
      e.preventDefault();
      window.localStorage.setItem('newCity', id);
      history.push('/newtravel');
   };

   useEffect(() => {
      document.getElementById('menu').classList.add('disp-none');
   });

   useEffect(
      () => () => {
         try {
            document.getElementById('menu').classList.remove('disp-none');
         } catch {}
      },
      []
   );

   useEffect(() => {
      if (window.localStorage.getItem(id)) {
         setPlaces(JSON.parse(window.localStorage.getItem(id)));
      } else {
         getPlaces(id)
            .then((data) => {
               window.localStorage.setItem(id, JSON.stringify(data));
               setPlaces(data);
            })
            .catch((error) => {
               console.error(error);
            });
      }
   }, [id, setPlaces]);

   return (
      <>
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
         <button className="btn-create" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            <p>Crear viaje</p>
         </button>
      </>
   );
}
