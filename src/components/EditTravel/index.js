import { lazy, useState, useEffect, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import useApp from 'hooks/useApp';
import putTravel from 'services/putTravel';
import './styles.scss';
import 'components/NewTravel/styles.scss';

const ScheduleForm = lazy(() => import('components/NewTravel/ScheduleForm'));
const EntryForm = lazy(() => import('components/NewTravel/EntryForm'));
const VisitForm = lazy(() => import('components/NewTravel/VisitForm'));
const PreferencesForm = lazy(() =>
   import('components/NewTravel/PreferencesForm')
);

export default function EditTravel() {
   const { currentTravel, travels, setTravels } = useApp();
   const startDay = new Date(currentTravel['startDay']),
      endDay = new Date(currentTravel['endDay']),
      itineraryStartTime = new Date(currentTravel['itineraryStartTime']),
      itineraryEndTime = new Date(currentTravel['itineraryEndTime']);
   const [state, setState] = useState({
      step: 0,
      travelID: currentTravel['_id'],
      city: currentTravel['city'],
      startDay:
         startDay.getFullYear() +
         '-' +
         (startDay.getMonth().toString().length > 1
            ? startDay.getMonth()
            : '0' + startDay.getMonth()) +
         '-' +
         (startDay.getDate().toString().length > 1
            ? startDay.getDate()
            : '0' + startDay.getDate()) +
         'T' +
         (startDay.getHours().toString().length > 1
            ? startDay.getHours()
            : '0' + startDay.getHours()) +
         ':' +
         (startDay.getMinutes().toString().length > 1
            ? startDay.getMinutes()
            : '0' + startDay.getMinutes()),
      endDay:
         endDay.getFullYear() +
         '-' +
         (endDay.getMonth().toString().length > 1
            ? endDay.getMonth()
            : '0' + endDay.getMonth()) +
         '-' +
         (endDay.getDate().toString().length > 1
            ? endDay.getDate()
            : '0' + endDay.getDate()) +
         'T' +
         (endDay.getHours().toString().length > 1
            ? endDay.getHours()
            : '0' + endDay.getHours()) +
         ':' +
         (endDay.getMinutes().toString().length > 1
            ? endDay.getMinutes()
            : '0' + endDay.getMinutes()),
      itineraryStartTime:
         (itineraryStartTime.getHours().toString().length > 1
            ? itineraryStartTime.getHours()
            : '0' + itineraryStartTime.getHours()) +
         ':' +
         (itineraryStartTime.getMinutes().toString().length > 1
            ? itineraryStartTime.getMinutes()
            : '0' + itineraryStartTime.getMinutes()),
      itineraryEndTime:
         (itineraryEndTime.getHours().toString().length > 1
            ? itineraryEndTime.getHours()
            : '0' + itineraryEndTime.getHours()) +
         ':' +
         (itineraryEndTime.getMinutes().toString().length > 1
            ? itineraryEndTime.getMinutes()
            : '0' + itineraryEndTime.getMinutes()),
      customEntryLocations: JSON.parse(
         JSON.stringify(currentTravel['customEntryLocations'])
      ),
      customVisitLocations: JSON.parse(
         JSON.stringify(currentTravel['customVisitLocations'])
      ),
      preferences: JSON.parse(JSON.stringify(currentTravel['preferences'])),
   });

   const history = useHistory();

   useEffect(
      () => () => {
         window.localStorage.removeItem('newCity');
         try {
            document.getElementById('menu').classList.remove('disp-none');
         } catch {}
      },
      []
   );

   useEffect(() => {
      document.getElementById('menu').classList.add('disp-none');
   });

   const handleBack = () => {
      history.goBack();
   };

   const handleChangeAdd = (input, value) => {
      if (input === 'customEntryLocations') {
         const all = state[input];
         all[value] = true;
         setState({ ...state, [input]: all });
      } else {
         const all = state[input];
         all.push(value);
         setState({ ...state, [input]: all });
      }
   };

   const handleChangeRemove = (input, value) => {
      if (input === 'customEntryLocations') {
         const all = state[input];
         delete all[value];
         setState({ ...state, [input]: all });
      } else {
         const all = state[input];
         setState({ ...state, [input]: all.filter((a) => a !== value) });
      }
   };

   const handleChange = (input, value) => {
      setState({
         ...state,
         [input]: value,
      });
   };

   const nextStep = useCallback(() => {
      if (state.step === 3) {
         var travel = {
            _id: state.travelID,
            city: state.city,
            startDay: new Date(state.startDay).toISOString(),
            endDay: new Date(state.endDay).toISOString(),
            itineraryStartTime: new Date(
               '01/01/1970 ' + state.itineraryStartTime
            ).toISOString(),
            itineraryEndTime: new Date(
               '01/01/1970 ' + state.itineraryEndTime
            ).toISOString(),
            customVisitLocations: state.customVisitLocations,
            customEntryLocations: state.customEntryLocations,
            preferences: state.preferences,
            expenses: currentTravel['Expenses'],
            travelUsers: currentTravel['TravelUsers'],
         };
         putTravel({ travel })
            .then((data) => {
               const all = travels.filter((t) => t['_id'] != state.travelID);
               all.push(data['travel']);
               setTravels(all);
               NotificationManager.success(
                  '',
                  'Viaje modificado correctamente',
                  5000
               );
            })
            .catch((error) => {
               NotificationManager.error(
                  '',
                  'El viaje no pudo ser modificado',
                  5000
               );
            });
      }
      setState({
         ...state,
         step: state.step + 1,
      });
   }, [state, setTravels, travels]);

   const prevStep = () => {
      setState({ ...state, step: state.step - 1 });
   };

   switch (state.step) {
      case 0:
         return (
            <ScheduleForm
               prevStep={handleBack}
               nextStep={nextStep}
               values={state}
               handleChange={handleChange}
            />
         );
      case 1:
         return (
            <EntryForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 2:
         return (
            <VisitForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 3:
         return (
            <PreferencesForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 4:
         return <Redirect to={'/travels/' + state.travelID} />;
      default:
         return <Redirect to="/cities" />;
   }
}
