export default function postSpend({ spend }) {
   return fetch(`${process.env.REACT_APP_API}/travel/expenses`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...spend }),
   }).then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok');
      return res.json();
   });
}
