import { useEffect } from 'react';
import './styles.scss';

export default function EditTravel() {
   useEffect(() => {
      document.getElementById('menu').classList.add('disp-none');
   }, []);

   useEffect(
      () => () => {
         try {
            document.getElementById('menu').classList.remove('disp-none');
         } catch {}
      },
      []
   );
   return <h1>Edit Travel</h1>;
}
