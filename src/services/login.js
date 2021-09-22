export default function login({ email, password }) {
   return fetch(`${process.env.REACT_APP_API}/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
   })
      .then((res) => {
         if (!res.ok) throw new Error('Response is NOT ok');
         return res.json();
      })
      .then((res) => {
         const { travelapp } = res;
         return travelapp;
      });
}
