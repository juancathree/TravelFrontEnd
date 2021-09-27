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
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';
import useApp from 'hooks/useApp';
import FormInput from 'components/FormInput';

export default function Expenses() {
   const history = useHistory();
   const { travels } = useApp();
   const { id } = useParams();
   const email = window.localStorage.getItem('email');

   const [state, setState] = useState({
      travel: travels.find((t) => t['_id'] === id),
      expenses: travels.find((t) => t['_id'] === id)['Expenses'],
      current: 'privados',
      add: false,
   });

   const updateQuantity = (qa) => {
      setState({ ...state, quantity: qa });
   };

   const updateDescription = (de) => {
      setState({ ...state, description: de });
   };

   const handleSubmit = () => {
      setState({ ...state, add: !state.add });
   };

   const handleExpenses = () => {
      return state.current === 'privados'
         ? state.expenses[email]['amount']
         : Object.keys(state.expenses).reduce(function (previous, key) {
              var expenses = state.expenses[key].expense.filter(
                 (e) => !e.isPersonal
              );
              if (key === email) {
                 return (
                    previous +
                    expenses.reduce(function (prev, e) {
                       return prev + e.amount;
                    }, 0)
                 );
              } else {
                 return (
                    previous -
                    expenses.reduce(function (prev, e) {
                       return prev + e.amount;
                    }, 0) /
                       (Object.keys(state.expenses).length - 1)
                 );
              }
           }, 0);
   };

   const handleExpensesList = () => {
      return state.current === 'privados' ? (
         <Fragment>
            {state.expenses[email].expense
               .filter((e) => e.isPersonal)
               .map((e) => (
                  <div key={e.description} className="expense">
                     <h4 className="amount">{e.amount + ' €'}</h4>
                     <h4 className="description">{e.description}</h4>
                  </div>
               ))}
         </Fragment>
      ) : (
         Object.keys(state.expenses).map((index) => (
            <Fragment>
               {state.expenses[index].expense
                  .filter((e) => !e.isPersonal)
                  .map((e) => (
                     <div key={e.description} className="expense-grupal">
                        <h4 className="amount">{e.amount + ' €'}</h4>
                        <h4 className="description">{e.description}</h4>
                        <h4 className="payer">
                           {index === email
                              ? 'tu'
                              : index.split('@')[0].slice(0, 4)}
                        </h4>
                     </div>
                  ))}
            </Fragment>
         ))
      );
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
                        <h3 className="amount">{handleExpenses() + '€'}</h3>
                     </Fragment>
                  ) : (
                     <Fragment>
                        <h3>{handleExpenses() > 0 ? 'Te deben:' : 'Debes:'}</h3>
                        <h3 className="amount">
                           {Math.abs(handleExpenses()) + '€'}
                        </h3>
                     </Fragment>
                  )}
               </div>
               <div className="select">
                  {state.travel['travelUsers'].length > 1 && (
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
         <button
            className={state.add ? 'hide-add' : 'btn-add-expense'}
            onClick={() => setState({ ...state, add: !state.add })}
         >
            <FontAwesomeIcon icon={faPlus} />
            <p>Crear gasto</p>
         </button>
         <div className={state.add ? 'show-add' : 'hide-add'}>
            <div className="add-form">
               <FontAwesomeIcon
                  className="close"
                  icon={faTimes}
                  onClick={() => setState({ ...state, add: !state.add })}
               />
               <h2>Agregar gasto</h2>
               <FormInput
                  id="cantidad"
                  type="number"
                  placeholder="Cantidad"
                  update={updateQuantity}
                  icon={faEuroSign}
               />
               <FormInput
                  id="descripcion"
                  type="text"
                  placeholder="Descripcion"
                  update={updateQuantity}
                  icon={faInfoCircle}
               />
               <div className="input">
                  <FontAwesomeIcon
                     className="input__icon"
                     icon={faShareAltSquare}
                  />
                  <select
                     className="input__field"
                     onChange={(e) => {
                        setState({ ...state, personal: e.target.value });
                     }}
                     value={state.personal}
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
      </Fragment>
   );
}
