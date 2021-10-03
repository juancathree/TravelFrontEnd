import { useEffect, useState, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faArrowLeft,
   faEuroSign,
   faInfoCircle,
   faPlus,
   faShareAltSquare,
   faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './styles.scss';
import 'components/FormInput/styles.scss';
import useApp from 'hooks/useApp';
import postSpend from 'services/postSpend';
import { NotificationManager } from 'react-notifications';

export default function Expenses() {
   const history = useHistory();
   const { currentTravel, setCurrentTravel } = useApp();

   const [state, setState] = useState({
      current: 'privados',
      email: window.localStorage.getItem('email').split('@')[0],
      quantity: 0,
      description: '',
      isPersonal: 'true',
      add: false,
   });

   const handleDelete = () => {
      if (state.email !== state.user) {
         setState({
            ...state,
            click: false,
            index: 0,
            user: '',
            personal: '',
         });
         NotificationManager.error(
            '',
            'No puede borrarse el gasto de otra persona',
            5000
         );
         return;
      }
      postSpend({
         spend: {
            travelID: currentTravel['_id'],
            exists: true,
            expense: {
               amount: state.amount,
               isPersonal: state.personal === 'privado' ? 'true' : 'false',
               description: state.description,
            },
         },
      })
         .then((data) => {
            var mTravel = currentTravel;
            var expenses = mTravel.Expenses[state.user].expense.filter(
               (e, i) =>
                  (state.personal === 'privado'
                     ? e.isPersonal
                     : !e.isPersonal) && i != state.index
            );
            mTravel.Expenses[state.user].expense
               .filter((e) =>
                  state.personal === 'privado' ? !e.isPersonal : e.isPersonal
               )
               .map((e) => expenses.push(e));
            mTravel.Expenses[state.user].expense = expenses;
            setCurrentTravel(mTravel);
            setState({
               ...state,
               click: false,
               index: 0,
               user: '',
               personal: '',
            });
            NotificationManager.success(
               '',
               'Gasto borrado correctamente',
               5000
            );
         })
         .catch((error) => {
            setState({
               ...state,
               click: false,
               index: 0,
               user: '',
               personal: '',
            });
            NotificationManager.error('', 'El gasto no pudo ser borrado', 5000);
         });
   };

   const handleSubmit = () => {
      postSpend({
         spend: {
            travelID: currentTravel['_id'],
            exists: false,
            expense: {
               amount: parseFloat(state.quantity).toFixed(2),
               isPersonal: state.isPersonal,
               description: state.description,
            },
         },
      })
         .then((data) => {
            var mTravel = currentTravel;
            mTravel.Expenses[state.email].expense.push({
               amount: parseFloat(state.quantity),
               isPersonal: state.isPersonal == 'true',
               description: state.description,
            });
            setCurrentTravel(mTravel);
            setState({
               ...state,
               add: !state.add,
               quantity: 0,
               description: '',
            });
            NotificationManager.success(
               '',
               'Gasto agregado correctamente',
               5000
            );
         })
         .catch((error) => {
            setState({
               ...state,
               add: !state.add,
               quantity: 0,
               description: '',
            });
            NotificationManager.error(
               '',
               'El gasto no pudo ser agregado',
               5000
            );
         });
   };

   const handleExpenses = () => {
      return state.current === 'privados'
         ? currentTravel.Expenses[state.email].expense
              .filter((e) => e.isPersonal)
              .reduce(function (previous, e) {
                 return previous + e.amount;
              }, 0)
         : Object.keys(currentTravel.Expenses).reduce(function (previous, key) {
              var expenses = currentTravel.Expenses[key].expense.filter(
                 (e) => !e.isPersonal
              );
              if (key === state.email) {
                 return (
                    previous +
                    expenses.reduce(function (prev, e) {
                       return prev + e.amount;
                    }, 0) /
                       Object.keys(currentTravel.Expenses).length
                 );
              } else {
                 return (
                    previous -
                    expenses.reduce(function (prev, e) {
                       return prev + e.amount;
                    }, 0) /
                       Object.keys(currentTravel.Expenses).length
                 );
              }
           }, 0);
   };

   const handleExpensesList = () => {
      return state.current === 'privados' ? (
         <Fragment>
            {currentTravel.Expenses[state.email].expense
               .filter((e) => e.isPersonal)
               .map((e, index) => {
                  return (
                     <div
                        id={index + '-' + state.email}
                        key={index + '-' + state.email}
                        className="expense"
                        onClick={handleExpenseClick}
                     >
                        <h4 key="amount" className="amount">
                           {e.amount + ' €'}
                        </h4>
                        <h4 key="description" className="description">
                           {e.description}
                        </h4>
                     </div>
                  );
               })}
         </Fragment>
      ) : (
         Object.keys(currentTravel.Expenses).map((index) => (
            <Fragment>
               {currentTravel.Expenses[index].expense
                  .filter((e) => !e.isPersonal)
                  .map((e, i) => (
                     <div
                        id={i + '-' + index}
                        key={i + '-' + index}
                        className="expense-grupal"
                        onClick={handleExpenseClick}
                     >
                        <h4 key="amount" className="amount">
                           {e.amount + ' €'}
                        </h4>
                        <h4 key="description" className="description">
                           {e.description}
                        </h4>
                        <h4 key="payer" className="payer">
                           {index === state.email
                              ? 'tu'
                              : index.split('@')[0].slice(0, 4)}
                        </h4>
                     </div>
                  ))}
            </Fragment>
         ))
      );
   };

   const handleExpenseClick = (e) => {
      setState({
         ...state,
         delete: true,
         click: true,
         index: e.currentTarget.getAttribute('id').split('-')[0],
         user: e.currentTarget.getAttribute('id').split('-')[1],
         amount: e.currentTarget
            .querySelector('.amount')
            .innerText.split(' ')[0],
         description: e.currentTarget.querySelector('.description').innerText,
         personal: e.currentTarget.classList.contains('expense')
            ? 'privado'
            : 'grupal',
      });
   };

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
   return (
      <Fragment>
         <div className="expenses__container">
            <div className="travel__back">
               <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="travel__icon"
                  size="2x"
                  onClick={() => history.goBack()}
               />
               <h4 className="travel__id">Gastos</h4>
            </div>
            <div className="expenses__list">
               <div className="total">
                  {state.current === 'privados' ? (
                     <Fragment>
                        <h3>Total:</h3>
                        <h3 className="amount">
                           {parseFloat(handleExpenses()).toFixed(2) + '€'}
                        </h3>
                     </Fragment>
                  ) : (
                     <Fragment>
                        <h3>{handleExpenses() > 0 ? 'Te deben:' : 'Debes:'}</h3>
                        <h3 className="amount">
                           {parseFloat(handleExpenses()).toFixed(2) + '€'}
                        </h3>
                     </Fragment>
                  )}
               </div>
               <div className="select">
                  {currentTravel['travelUsers'].length > 1 && (
                     <Fragment>
                        <h3
                           className={
                              state.current === 'privados'
                                 ? 'active'
                                 : 'inactive'
                           }
                           onClick={() =>
                              setState({ ...state, current: 'privados' })
                           }
                        >
                           Privados
                        </h3>
                        <h3
                           className={
                              state.current === 'grupales'
                                 ? 'active'
                                 : 'inactive'
                           }
                           onClick={() =>
                              setState({ ...state, current: 'grupales' })
                           }
                        >
                           Grupales
                        </h3>
                     </Fragment>
                  )}
               </div>
               <div className="list">{handleExpensesList()}</div>
            </div>
         </div>
         <div className={state.add ? 'show-add' : 'hide-add'}>
            <div className="add-form">
               <FontAwesomeIcon
                  className="close"
                  icon={faTimes}
                  onClick={() => setState({ ...state, add: !state.add })}
               />
               <h2 className="text">Agregar gasto</h2>
               <div key="cantidad" className="input">
                  <FontAwesomeIcon className="input__icon" icon={faEuroSign} />
                  <input
                     id="cantidad"
                     className="input__field"
                     type="number"
                     placeholder="Cantidad"
                     onChange={(e) => {
                        setState({ ...state, quantity: e.target.value });
                     }}
                     value={state.quantity}
                  />
               </div>
               <div key="description" className="input">
                  <FontAwesomeIcon
                     className="input__icon"
                     icon={faInfoCircle}
                  />
                  <input
                     id="description"
                     className="input__field"
                     type="text"
                     placeholder="Descripcion"
                     onChange={(e) => {
                        setState({ ...state, description: e.target.value });
                     }}
                     value={state.description}
                  />
               </div>
               <div className="input">
                  <FontAwesomeIcon
                     className="input__icon"
                     icon={faShareAltSquare}
                  />
                  <select
                     className="input__field"
                     onChange={(e) => {
                        setState({ ...state, isPersonal: e.target.value });
                     }}
                  >
                     <option value="true">Personal</option>
                     <option value="false">Grupal</option>
                  </select>
               </div>
               <button className="btn" onClick={handleSubmit}>
                  <p>Agregar</p>
               </button>
            </div>
         </div>
         <button
            className={
               state.add || state.delete ? 'hide-add' : 'btn-add-expense'
            }
            onClick={() => setState({ ...state, add: !state.add })}
         >
            <FontAwesomeIcon icon={faPlus} />
            <p>Crear gasto</p>
         </button>
         <div className={state.click ? 'show-add' : 'hide-add'}>
            <div className="add-form">
               <h4 className="text">¿Borrar gasto?</h4>
               <button className="btn delete" onClick={handleDelete}>
                  <p>Eliminar</p>
               </button>
               <button
                  className="btn cancel"
                  onClick={() =>
                     setState({ ...state, click: false, delete: false })
                  }
               >
                  <p>Cancelar</p>
               </button>
            </div>
         </div>
      </Fragment>
   );
}
