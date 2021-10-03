import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FormInput from 'components/FormInput';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { NotificationManager } from 'react-notifications';
import './styles.scss';

export default function Login() {
   const [email, setEmail] = useState(
      window.localStorage.getItem('email') || ''
   );
   const [password, setPassword] = useState('');

   const updateEmail = (em) => {
      setEmail(em);
   };

   const updatePassword = (pa) => {
      setPassword(pa);
   };

   const { login, isLogged, hasError } = useAuth();
   const history = useHistory();

   useEffect(() => {
      if (isLogged) {
         window.localStorage.setItem(
            'email',
            document.getElementById('email').value
         );
         history.push('/');
      }
   }, [isLogged, history]);

   useEffect(() => {
      if (hasError) {
         NotificationManager.error(
            'No pudimos econtrar un usuario con el email o la contraseña proporcionados',
            'Error en las credenciales',
            5000
         );
      }
   }, [hasError]);

   const handleSubmit = (e) => {
      e.preventDefault();
      document.getElementById('password').value = '';
      login({ email, password });
   };

   return (
      <div className="login">
         <div className="login__container">
            <form className="login__form" onSubmit={handleSubmit}>
               <h2 className="login__title">
                  <span className="title__first">City</span>
                  <span className="title__last">Walker</span>
               </h2>
               <FormInput
                  id="email"
                  type="email"
                  placeholder="Email"
                  update={updateEmail}
                  value={email}
                  icon={faEnvelope}
               />
               <FormInput
                  id="password"
                  type="password"
                  placeholder="Contraseña"
                  update={updatePassword}
                  value=""
                  icon={faLock}
               />
               <button className="login__btn">Entrar</button>
            </form>
            <div className="signup">
               <h4>
                  ¿No tienes cuenta?
                  <Link to="/signup"> Registrate</Link>
               </h4>
            </div>
         </div>
      </div>
   );
}
