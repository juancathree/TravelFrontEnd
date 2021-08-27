import { useState, createContext, memo, useEffect } from 'react';
import getCities from 'services/getCities';

export const AppContext = createContext();

export default memo(function AppProvider({ children }) {
   const [cities, setCities] = useState([]);
   const [travels, setTravels] = useState([]);
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

      // load user
   }, []);

   return (
      <AppContext.Provider
         value={{
            cities,
            setCities,
            travels,
            setTravels,
            places,
            setPlaces,
            user,
            setUser,
         }}
      >
         {children}
      </AppContext.Provider>
   );
});
