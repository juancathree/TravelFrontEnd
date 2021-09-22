export default function signup({ name, email, password }) {
   return fetch(`${process.env.REACT_APP_API}/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
   }).then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok');
      return res.json();
   });
}
