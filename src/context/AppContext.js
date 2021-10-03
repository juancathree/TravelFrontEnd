import { useState, createContext, useEffect } from 'react';
import getCities from 'services/getCities';
import getTravels from 'services/getTravels';

export const AppContext = createContext();

export default function AppProvider({ children }) {
   const [cities, setCities] = useState([]);
   const [travels, setTravels] = useState([]);
   const [currentTravel, setCurrentTravel] = useState();
   const [places, setPlaces] = useState([]);
   const [user, setUser] = useState({});

   useEffect(() => {
      // load cities
      getCities()
         .then((data) => {
            window.localStorage.setItem('cities', JSON.stringify(data));
            setCities(data);
         })
         .catch((error) => {
            setCities(JSON.parse(window.localStorage.getItem('cities')));
         });
      // load travels
      getTravels()
         .then((data) => {
            window.localStorage.setItem('travels', JSON.stringify(data));
            setTravels(data);
         })
         .catch((error) => {
            setTravels(JSON.parse(window.localStorage.getItem('travels')));
         });
      // load user
   }, []);

   return (
      <AppContext.Provider
         value={{
            cities,
            setCities,
            travels,
            setTravels,
            currentTravel,
            setCurrentTravel,
            places,
            setPlaces,
            user,
            setUser,
         }}
      >
         {children}
      </AppContext.Provider>
   );
}
