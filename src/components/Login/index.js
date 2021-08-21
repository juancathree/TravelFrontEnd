import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const history = useHistory();

  const handleSubmit = (e) => {
    // e.preventDefault();
    history.push("/signup");
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
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input className="input" type="password" placeholder="Contraseña" />
          </div>
          <Link className="forgot" to="/forgot">
            ¿Has olvidado la contraseña?
          </Link>
          <button className="btn">Login</button>
        </form>
        <div className="signup">
          <h4>
            ¿No tienes cuenta? <Link to="/signup">Registrate</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
