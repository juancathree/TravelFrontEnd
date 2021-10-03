export default function putTravel({ travel }) {
   return fetch(`${process.env.REACT_APP_API}/travel`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...travel }),
   }).then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok');
      return res.json();
   });
}
