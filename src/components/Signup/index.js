import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();

  const handleSubmit = (e) => {
    // e.preventDefault();
    history.push("/login");
  };

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit} className="signin">
          <h2 className="title">JATW</h2>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input className="input" type="text" placeholder="Usuario" />
          </div>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input className="input" type="email" placeholder="Email" />
          </div>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input className="input" type="password" placeholder="Contraseña" />
          </div>
          <button className="btn">Signup</button>
        </form>
        <div className="signup">
          <h4>
            ¿Ya tienes cuenta? <Link to="/login">Logueate</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
