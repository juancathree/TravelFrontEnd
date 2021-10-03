import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import useAuth from 'hooks/useAuth';
import './styles.scss';

export default function Travels() {
   const { logout } = useAuth();

   return (
      <div className="container">
         <h3 className="user">Usuario</h3>
         <FontAwesomeIcon icon={faUserCircle} className="user__icon" />
         <div className="user__info">
            <h5>{window.localStorage.getItem('email')}</h5>
         </div>
         <button className="btn-logout" onClick={logout}>
            <p>Salir</p>
         </button>
      </div>
   );
}
