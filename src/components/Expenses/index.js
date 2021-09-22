import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import './styles.scss';
import useApp from 'hooks/useApp';

export default function Expenses() {
   const history = useHistory();
   const { travels } = useApp();
   const { id } = useParams();

   const [state, setState] = useState({
      travel: travels.find((t) => t['_id'] === id),
      expenses: travels.find((t) => t['_id'] === id)['Expenses'],
      current: 'grupales',
   });

   const handleExpenses = () => {
      return state.current === 'privados'
         ? state.expenses[window.localStorage.getItem('email')]['amount']
         : Object.keys(state.expenses).reduce(function (previous, key) {
              return previous + state.expenses[key]['amount'];
           }, 10);
   };

   const handleExpensesList = () => {
      return state.current === 'privados'
         ? console.log(
              state.expenses[window.localStorage.getItem('email')]['expense']
           )
         : Object.keys(state.expenses).map((index) =>
              console.log(state.expenses[index]['expense'])
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
            <div className="total">{handleExpenses()}</div>
            <div className="select">
               {state.travel['travelUsers'].length > 1 && (
                  <div>
                     <h3>Privados</h3>
                     <h3>Grupales</h3>
                  </div>
               )}
            </div>
            <div className="list">{handleExpensesList()}</div>
         </div>
      </div>
   );
}
