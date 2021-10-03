import { useState, lazy, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import useApp from 'hooks/useApp';
import postTravel from 'services/postTravel';
import './styles.scss';

const CityForm = lazy(() => import('./CityForm'));
const ScheduleForm = lazy(() => import('./ScheduleForm'));
const EntryForm = lazy(() => import('./EntryForm'));
const VisitForm = lazy(() => import('./VisitForm'));
const PreferencesForm = lazy(() => import('./PreferencesForm'));

export default function NewTravel() {
   const { travels, setTravels } = useApp();
   const [state, setState] = useState({
      step: window.localStorage.getItem('newCity') ? 2 : 1,
      city: window.localStorage.getItem('newCity') || '',
      startDay: '',
      endDay: '',
      itineraryStartTime: '',
      itineraryEndTime: '',
      customEntryLocations: {},
      customVisitLocations: [],
      preferences: [],
   });

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

   const nextStep = useCallback(
      (input, value) => {
         if (state.step === 5) {
            var travel = {
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
            };
            postTravel({ travel })
               .then((data) => {
                  const all = travels;
                  all.push(data['travel']);
                  setTravels(all);
                  NotificationManager.success(
                     '',
                     'Viaje creado correctamente',
                     5000
                  );
               })
               .catch((error) => {
                  NotificationManager.error(
                     '',
                     'El viaje no pudo ser creado',
                     5000
                  );
               });
         }
         setState({
            ...state,
            [input]: value,
            step: state.step + 1,
         });
      },
      [state, setTravels, travels]
   );

   const prevStep = () => {
      setState({ ...state, step: state.step - 1 });
   };

   switch (state.step) {
      case 1:
         return <CityForm nextStep={nextStep} />;
      case 2:
         return (
            <ScheduleForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChange={handleChange}
            />
         );
      case 3:
         return (
            <EntryForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 4:
         return (
            <VisitForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 5:
         return (
            <PreferencesForm
               prevStep={prevStep}
               nextStep={nextStep}
               values={state}
               handleChangeAdd={handleChangeAdd}
               handleChangeRemove={handleChangeRemove}
            />
         );
      case 6:
         return <Redirect to="/travels" />;
      default:
         return <Redirect to="/cities" />;
   }
}
