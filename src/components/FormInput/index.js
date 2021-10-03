import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

export default function FormInput({
   update,
   id,
   type,
   value,
   placeholder,
   icon,
}) {
   const [state, setState] = useState(value);

   return (
      <div className="input">
         <FontAwesomeIcon className="input__icon" icon={icon} />
         <input
            id={id}
            className="input__field"
            type={type}
            placeholder={placeholder}
            onChange={(e) => {
               setState(e.target.value);
               update(e.target.value);
            }}
            value={state}
         />
      </div>
   );
}
