import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faUser,
   faGlobeAmericas,
   faSuitcase,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './styles.scss';

export default memo(function Navbar() {
   const handleClick = (icon) => {
      switch (icon) {
         case 'globe':
            document.getElementById('globe').classList.add('active');
            document.getElementById('suitcase').classList.remove('active');
            document.getElementById('user').classList.remove('active');
            break;
         case 'plane':
            document.getElementById('globe').classList.remove('active');
            document.getElementById('suitcase').classList.add('active');
            document.getElementById('user').classList.remove('active');
            break;
         case 'user':
            document.getElementById('globe').classList.remove('active');
            document.getElementById('suitcase').classList.remove('active');
            document.getElementById('user').classList.add('active');
            break;
         default:
            break;
      }
   };

   return (
      <nav className="menu">
         <Link className="menu__item" to="/">
            <FontAwesomeIcon
               id="globe"
               className="active"
               icon={faGlobeAmericas}
               size="2x"
               onClick={() => handleClick('globe')}
            />
         </Link>
         <Link className="menu__item" to="/travels">
            <FontAwesomeIcon
               id="suitcase"
               className="inactive"
               icon={faSuitcase}
               size="2x"
               onClick={() => handleClick('plane')}
            />
         </Link>
         <Link className="menu__item" to="/user">
            <FontAwesomeIcon
               id="user"
               className="inactive"
               icon={faUser}
               size="2x"
               onClick={() => handleClick('user')}
            />
         </Link>
      </nav>
   );
});
