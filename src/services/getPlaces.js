export default function getCities(id) {
   return fetch(`${process.env.REACT_APP_API}/place/` + id, {
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
