import { IKImage } from 'imagekitio-react';
import './styles.css';

export default function Place({ place }) {
   return (
      <div key={place.name} className="place__item">
         <IKImage path={'roma.jpg'} loading="lazy" className="place__img" />
         <div className="place__info">
            <span className="place__name">{place.name}</span>
            <span className="place__category">{place.category}</span>
            <span className="place__description">{place.information}</span>
         </div>
      </div>
   );
}
