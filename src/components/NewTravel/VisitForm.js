import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IKImage } from 'imagekitio-react';

export default function VisitForm({
   nextStep,
   prevStep,
   handleChangeAdd,
   handleChangeRemove,
   values,
}) {
   const { city, customEntryLocations } = values;
   const places = JSON.parse(window.localStorage.getItem(city));

   const handleClick = (e) => {
      e.preventDefault();
      if (e.currentTarget.classList.contains('city__form-clicked')) {
         handleChangeRemove(
            'customVisitLocations',
            e.currentTarget.getAttribute('id')
         );
         e.currentTarget.classList.remove('city__form-clicked');
      } else {
         handleChangeAdd(
            'customVisitLocations',
            e.currentTarget.getAttribute('id')
         );
         e.currentTarget.classList.add('city__form-clicked');
      }
   };

   useEffect(() => {
      const { customVisitLocations } = values;
      customVisitLocations.forEach((cv) => {
         document.getElementById(cv).classList.add('city__form-clicked');
      });
   });

   return (
      <div className="travel__form">
         <div className="travel__navigation">
            <FontAwesomeIcon
               icon={faArrowLeft}
               className="travel__icon"
               size="2x"
               onClick={prevStep}
            />
            <h4 className="travel__title">Elige los sitios</h4>
         </div>
         <div className="cities__form">
            <h4 className="cities__info">
               Selecciona los sitios que <strong>NO</strong> quieras visitar
            </h4>
            {places
               .filter(
                  (place) =>
                     place.visit.outside != null &&
                     !customEntryLocations.has(place.name)
               )
               .map((place) => (
                  <div
                     id={place.name}
                     key={place.name}
                     className="city__form"
                     onClick={handleClick}
                  >
                     <IKImage
                        path={place.name.replaceAll(' ', '_') + '.webp'}
                        loading="lazy"
                        className="city__img"
                     />
                     <div className="city__title-container">
                        <h5 className="city__title">{place.name}</h5>
                     </div>
                  </div>
               ))}
         </div>
         <button className="schedule__btn" onClick={nextStep}>
            Continuar
         </button>
      </div>
   );
}
