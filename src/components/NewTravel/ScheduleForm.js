import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ScheduleForm({
   prevStep,
   nextStep,
   handleChange,
   values,
}) {
   const handleDays = (e) => {
      e.preventDefault();
      handleChange('startDay', e.target.value);
      document.getElementById('endDay').setAttribute('min', e.target.value);
   };

   const handleHours = (e) => {
      e.preventDefault();
      handleChange('itineraryStartTime', e.target.value);
      document
         .getElementById('endItinerary')
         .setAttribute('min', e.target.value);
   };

   const handleSubmit = (e) => {
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
            <h4 className="travel__title">Elige los dias y horarios</h4>
         </div>
         <form className="schedule__form" onSubmit={handleSubmit}>
            <div className="schedule__input">
               <h5 className="schedule__label">Dia y hora inicial:</h5>
               <input
                  className="schedule__picker"
                  type="datetime-local"
                  id="startDay"
                  name="trip-start"
                  min={new Date().toISOString()}
                  value={values.startDay}
                  required
                  onChange={handleDays}
               />
               <p className="schedule__info">* Empezaras el itinerario</p>
            </div>
            <div className="schedule__input">
               <h5 className="schedule__label">Dia y hora final:</h5>
               <input
                  className="schedule__picker"
                  type="datetime-local"
                  id="endDay"
                  name="trip-end"
                  value={values.endDay}
                  onChange={(e) => handleChange('endDay', e.target.value)}
                  required
               />
               <p className="schedule__info">* Finalizaras el itinerario</p>
            </div>
            <div className="schedule__input">
               <h5 className="schedule__label">Hora inicial del dia:</h5>
               <input
                  className="schedule__picker"
                  type="time"
                  id="startItinerary"
                  name="itinerary-start"
                  onChange={handleHours}
                  value={values.itineraryStartTime}
                  required
               />
               <p className="schedule__info">
                  * Comienzo de itinerario los dias distintos al inicial
               </p>
            </div>
            <div className="schedule__input">
               <h5 className="schedule__label">Hora final del dia:</h5>
               <input
                  className="schedule__picker"
                  type="time"
                  id="endItinerary"
                  name="itinerary-end"
                  value={values.itineraryEndTime}
                  onChange={(e) =>
                     handleChange('itineraryEndTime', e.target.value)
                  }
                  required
               />
               <p className="schedule__info">
                  * Fin del dia para el itinerario
               </p>
            </div>
            <button className="schedule__btn">Continuar</button>
         </form>
      </div>
   );
}
