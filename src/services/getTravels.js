export default function getTravels() {
   return fetch(`${process.env.REACT_APP_API}/travel`, {
      method: 'GET',
      credentials: 'include',
   })
      .then((res) => {
         if (!res.ok) throw new Error('Response is NOT ok');
         return res.json();
      })
      .then((res) => {
         const { travels } = res;
         return travels;
      });
}
