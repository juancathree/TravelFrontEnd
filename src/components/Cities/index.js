import { memo } from 'react';
import { Link } from 'react-router-dom';
import useApp from 'hooks/useApp';
import { IKImage } from 'imagekitio-react';
import './styles.css';

export default memo(function Cities() {
   const { cities } = useApp();

   return (
      <div className="container">
         <div className="cities-container">
            {cities.map((city) => (
               <Link key={city} className="cities__item" to={city}>
                  <IKImage
                     path={city + '.jpg'}
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
