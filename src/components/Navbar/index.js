import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faUser,
   faGlobeAmericas,
   faPlaneDeparture,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './styles.css';

export default memo(function Navbar() {
   const handleClick = (icon) => {
      switch (icon) {
         case 'globe':
            document.getElementById('globe').classList.add('active');
            document.getElementById('plane').classList.remove('active');
            document.getElementById('user').classList.remove('active');
            break;
         case 'plane':
            document.getElementById('globe').classList.remove('active');
            document.getElementById('plane').classList.add('active');
            document.getElementById('user').classList.remove('active');
            break;
         case 'user':
            document.getElementById('globe').classList.remove('active');
            document.getElementById('plane').classList.remove('active');
            document.getElementById('user').classList.add('active');
            break;
         default:
            break;
      }
   };

   return (
      <nav className="menu">
         <Link className="menu-item" to="/">
            <FontAwesomeIcon
               id="globe"
               className="active"
               icon={faGlobeAmericas}
               size="2x"
               onClick={() => handleClick('globe')}
            />
         </Link>
         <Link className="menu-item" to="/travels">
            <FontAwesomeIcon
               id="plane"
               className="inactive"
               icon={faPlaneDeparture}
               size="2x"
               onClick={() => handleClick('plane')}
            />
         </Link>
         <Link className="menu-item" to="/user">
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
