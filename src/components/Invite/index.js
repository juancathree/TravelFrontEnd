import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import useApp from 'hooks/useApp';
import FormInput from 'components/FormInput';
import { useEffect } from 'react';
import putTravelUsers from 'services/putTravelUsers';
import { NotificationManager } from 'react-notifications';
import './styles.scss';

export default function Invite() {
   const history = useHistory();
   const { currentTravel, setCurrentTravel, travels, setTravels } = useApp();
   const [email, setEmail] = useState();

   useEffect(() => {
      document.getElementById('menu').classList.add('disp-none');
   }, []);

   useEffect(
      () => () => {
         try {
            document.getElementById('menu').classList.remove('disp-none');
         } catch {}
      },
      []
   );

   const updateEmail = (em) => {
      setEmail(em.toLowerCase());
   };

   const handleSubmit = () => {
      if (currentTravel['travelUsers'].includes(email)) {
         NotificationManager.error(
            '',
            'El usuario ya existe en el viaje',
            5000
         );
         history.goBack();
         return;
      }
      putTravelUsers({
         user: {
            travelID: currentTravel['_id'],
            exists: false,
            email: email,
         },
      })
         .then((data) => {
            var mTravel = currentTravel;
            mTravel.travelUsers.push(email);
            mTravel.Expenses[email.split('@')[0]] = {
               amount: 0,
               expense: [],
            };
            var mTravels = travels.filter((t) => t['_id'] !== mTravel['_id']);
            mTravels.push(mTravel);
            setTravels(mTravels);
            setCurrentTravel(mTravel);
            NotificationManager.success(
               '',
               'Usuario agregado correctamente',
               5000
            );
            history.goBack();
         })
         .catch((error) => {
            NotificationManager.error('', 'Usuario no encontrado', 5000);
            history.goBack();
         });
   };

   return (
      <Fragment>
         <div className="invite__container">
            <div className="travel__back">
               <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="travel__icon"
                  size="2x"
                  onClick={() => history.goBack()}
               />
               <h4 className="travel__id">Invitar</h4>
            </div>
            <div className="invite__search">
               <h3>
                  Solo sera invitad@ si ya esta registrad@ en la aplicación
               </h3>
               <FormInput
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  update={updateEmail}
                  icon={faEnvelope}
               />
               <button className="btn" onClick={handleSubmit}>
                  <p>Invitar</p>
               </button>
            </div>
         </div>
      </Fragment>
   );
}
