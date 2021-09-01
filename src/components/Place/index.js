import { IKImage } from 'imagekitio-react';
import './styles.scss';

export default function Place({ place }) {
   return (
      <div key={place.name} className="place">
         <IKImage
            path={place.name.replaceAll(' ', '_') + '.webp'}
            loading="lazy"
            className="place__img"
         />
         <div className="place__info">
            <span className="place__name">{place.name}</span>
            <span className="place__category">{place.category}</span>
            <span className="place__description">{place.information}</span>
         </div>
      </div>
   );
}
