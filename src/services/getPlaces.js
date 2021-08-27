const ENDPOINT = 'http://localhost:8000';

export default function getCities(id) {
   return fetch(`${ENDPOINT}/place/` + id, {
      method: 'GET',
      credentials: 'include',
   })
      .then((res) => {
         if (!res.ok) throw new Error('Response is NOT ok');
         return res.json();
      })
      .then((res) => {
         const { places } = res;
         return places;
      });
}
