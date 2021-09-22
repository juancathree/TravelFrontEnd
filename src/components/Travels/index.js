import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApp from 'hooks/useApp';
import { useHistory } from 'react-router-dom';
import { IKImage } from 'imagekitio-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

export default memo(function Travels() {
   const { travels } = useApp();
   const [tr, setTravels] = useState(travels);
   const history = useHistory();

   useEffect(() => {
      setTravels(travels);
   }, [setTravels, travels]);

   const handleAdd = (e) => {
      e.preventDefault();
      history.push('/newtravel');
   };

   return (
      <div className="container">
         <h3 className="travels">Viajes</h3>
         {tr.maplength !== 0 && (
            <div className="travels__container">
               {tr.map((travel) => (
                  <Link
                     key={travel['city']}
                     className="travels__item"
                     to={'/travels/'.concat(travel['_id'])}
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
         {tr.length === 0 && (
            <h4 className="empty-travels">No tienes ningun viaje</h4>
         )}
         <button className="btn-add" onClick={handleAdd}>
            <FontAwesomeIcon icon={faPlus} />
            <p>Crear viaje</p>
         </button>
      </div>
   );
});
