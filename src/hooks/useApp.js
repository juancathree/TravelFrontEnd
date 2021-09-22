import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

export default function useApp() {
   const { cities, places, setPlaces, travels, setTravels, user } =
      useContext(AppContext);

   return {
      cities,
      places,
      setPlaces,
      travels,
      setTravels,
      user,
   };
}
