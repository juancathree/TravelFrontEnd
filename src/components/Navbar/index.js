import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faUser,
   faGlobeAmericas,
   faSuitcase,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export default memo(function Navbar() {
   return (
      <nav id="menu" className="menu">
         <NavLink className="menu__item" to="/cities" activeClassName="active">
            <FontAwesomeIcon
               id="globe"
               className="inactive"
               icon={faGlobeAmericas}
               size="2x"
            />
         </NavLink>
         <NavLink className="menu__item" to="/travels" activeClassName="active">
            <FontAwesomeIcon
               id="suitcase"
               className="inactive"
               icon={faSuitcase}
               size="2x"
            />
         </NavLink>
         <NavLink className="menu__item" to="/user" activeClassName="active">
            <FontAwesomeIcon
               id="user"
               className="inactive"
               icon={faUser}
               size="2x"
            />
         </NavLink>
      </nav>
   );
});
