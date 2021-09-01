import { memo } from 'react';
import { Link } from 'react-router-dom';
import useApp from 'hooks/useApp';
import { IKImage } from 'imagekitio-react';
import './styles.scss';

export default memo(function Cities() {
   const { cities } = useApp();

   return (
      <div className="container">
         <h3 className="cities">Cities</h3>
         <div className="cities__container">
            {cities.map((city) => (
               <Link key={city} className="cities__item" to={city}>
                  <IKImage
                     path={city + '.webp'}
                     loading="lazy"
                     className="cities__img"
                  />
                  <h2 className="cities__title">{city.toUpperCase()}</h2>
               </Link>
            ))}
         </div>
      </div>
   );
});
