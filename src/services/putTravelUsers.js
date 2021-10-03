export default function putTravelUsers({ user }) {
   return fetch(`${process.env.REACT_APP_API}/travel/users`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...user }),
   }).then((res) => {
      if (!res.ok) throw new Error('Response is NOT ok');
      return res.json();
   });
}
