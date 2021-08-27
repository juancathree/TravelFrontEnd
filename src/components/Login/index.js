import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useTranslation } from 'react-i18next';
import {
   NotificationContainer,
   NotificationManager,
} from 'react-notifications';
import './styles.css';

export default function Login() {
   const [t] = useTranslation('global');
   const [email, setEmail] = useState(
      window.localStorage.getItem('email') || ''
   );
   const [password, setPassword] = useState('');
   const passwordRef = useRef(null);
   const emailRef = useRef(null);
   const { login, isLogged, hasLoginError } = useAuth();
   const history = useHistory();

   useEffect(() => {
      if (isLogged) {
         window.localStorage.setItem('email', emailRef.current.value);
         history.push('/');
      }
   }, [isLogged, history]);

   useEffect(() => {
      if (hasLoginError) {
         NotificationManager.error(
            t('login.msgError'),
            t('login.titleError'),
            5000
         );
      }
   }, [hasLoginError, t]);

   const handleSubmit = (e) => {
      e.preventDefault();
      passwordRef.current.value = '';
      login({ email, password });
   };

   return (
      <div className="container">
         <div className="form">
            <form className="signin" onSubmit={handleSubmit}>
               <h2 className="title">{t('login.title')}</h2>
               <div className="input-field">
                  <FontAwesomeIcon className="icon" icon={faEnvelope} />
                  <input
                     ref={emailRef}
                     className="input"
                     type="email"
                     placeholder={t('login.email')}
                     onChange={(e) => setEmail(e.target.value)}
                     value={email}
                  />
               </div>
               <div className="input-field">
                  <FontAwesomeIcon className="icon" icon={faLock} />
                  <input
                     ref={passwordRef}
                     className="input"
                     type="password"
                     placeholder={t('login.password')}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <Link className="forgot" to="/forgot">
                  {t('login.forgot')}
               </Link>
               <button className="btn">{t('login.login')}</button>
            </form>
            <div className="signup">
               <h4>
                  {t('login.unregister')}{' '}
                  <Link to="/signup">{t('login.register')}</Link>
               </h4>
            </div>
         </div>
         <NotificationContainer />
      </div>
   );
}
