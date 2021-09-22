export default function getCities() {
   return fetch(`${process.env.REACT_APP_API}/place/cities`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((res) => {
         if (!res.ok) throw new Error('Response is NOT ok');
         return res.json();
      })
      .then((res) => {
         const { cities } = res;
         return cities;
      });
}
