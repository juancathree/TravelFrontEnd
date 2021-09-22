import { useState, useEffect } from 'react';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { NotificationManager } from 'react-notifications';
import FormInput from 'components/FormInput';
import 'components/Login/styles.scss';

export default function Signup() {
   const { signup, hasError, isRegister } = useAuth();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [name, setName] = useState('');
   const history = useHistory();

   useEffect(() => {
      if (isRegister) {
         NotificationManager.success('', 'Usuario creado correctamente', 5000);
         history.push('/login');
      }
   }, [isRegister, history]);

   useEffect(() => {
      if (hasError) {
         NotificationManager.error(
            '',
            'El usuario no pudo ser creado, intentelo mas tarde',
            5000
         );
      }
   }, [hasError]);

   const updateEmail = (em) => {
      setEmail(em);
   };

   const updatePassword = (pa) => {
      setPassword(pa);
   };

   const updateName = (na) => {
      setName(na);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      signup({ name, email, password });
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
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  update={updateName}
                  value=""
                  icon={faUser}
               />
               <FormInput
                  id="email"
                  type="email"
                  placeholder="Email"
                  update={updateEmail}
                  value=""
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
               <button className="login__btn">Registrarse</button>
            </form>
            <div className="signup">
               <h4>
                  ¿Ya tienes cuenta?
                  <Link to="/login"> Entrar</Link>
               </h4>
            </div>
         </div>
      </div>
   );
}
