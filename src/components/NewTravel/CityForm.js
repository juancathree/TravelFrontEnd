import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { IKImage } from 'imagekitio-react';

export default function CityForm({ nextStep }) {
   const history = useHistory();
   const cities = JSON.parse(window.localStorage.getItem('cities'));

   const goOn = (e) => {
      e.preventDefault();
      nextStep('city', e.currentTarget.getAttribute('id'));
   };

   return (
      <div className="travel__form">
         <div className="travel__navigation">
            <FontAwesomeIcon
               icon={faTimes}
               className="travel__icon"
               size="2x"
               onClick={() => history.goBack()}
            />
            <h4 className="travel__title">Elige la ciudad</h4>
         </div>
         <div className="cities__form">
            {cities.map((city) => (
               <div id={city} key={city} className="city__form" onClick={goOn}>
                  <IKImage
                     path={city + '.webp'}
                     loading="lazy"
                     className="city__img"
                  />
                  <div className="city__title-container">
                     <h4 className="city__title">{city.toUpperCase()}</h4>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
