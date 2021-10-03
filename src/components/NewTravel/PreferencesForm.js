import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { IKImage } from 'imagekitio-react';

export default function PreferencesForm({
   nextStep,
   prevStep,
   handleChangeAdd,
   handleChangeRemove,
   values,
}) {
   const { city } = values;
   const places = JSON.parse(window.localStorage.getItem(city));
   const categories = [...new Set(places.map((x) => x.category))];

   useEffect(() => {
      const { preferences } = values;
      preferences.forEach((cv) => {
         document.getElementById(cv).classList.add('city__form-clicked');
      });
   });

   const handleClick = (e) => {
      e.preventDefault();
      if (e.currentTarget.classList.contains('city__form-clicked')) {
         handleChangeRemove('preferences', e.currentTarget.getAttribute('id'));
         e.currentTarget.classList.remove('city__form-clicked');
      } else {
         handleChangeAdd('preferences', e.currentTarget.getAttribute('id'));
         e.currentTarget.classList.add('city__form-clicked');
      }
   };

   const handleContinue = (e) => {
      e.preventDefault();
      nextStep();
   };

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
               Selecciona los tipos de lugares que <strong>NO </strong>te
               interesan
            </h4>
            {categories.map((category) => (
               <div
                  id={category}
                  key={category}
                  className="city__form"
                  onClick={handleClick}
               >
                  <IKImage
                     path={category.replaceAll(' ', '_') + '.webp'}
                     loading="lazy"
                     className="city__img"
                  />
                  <div className="city__title-container">
                     <h5 className="city__title">{category}</h5>
                  </div>
               </div>
            ))}
         </div>
         <button className="schedule__btn" onClick={handleContinue}>
            Continuar
         </button>
      </div>
   );
}
