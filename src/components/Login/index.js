import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import "./styles.css";

export default function Login() {
  const [t] = useTranslation("global");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogged, isLoginLoading, hasLoginError } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (isLogged) history.push("/");
  }, [isLogged, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="container">
      {isLoginLoading && <strong>Checking credentials</strong>}
      {!isLoginLoading && (
        <div className="form">
          <form className="signin" onSubmit={handleSubmit}>
            <h2 className="title">{t("login.title")}</h2>
            <div className="input-field">
              <FontAwesomeIcon className="icon" icon={faEnvelope} />
              <input
                className="input"
                type="email"
                placeholder={t("login.email")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field">
              <FontAwesomeIcon className="icon" icon={faLock} />
              <input
                className="input"
                type="password"
                placeholder={t("login.password")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link className="forgot" to="/forgot">
              {t("login.forgot")}
            </Link>
            <button className="btn">{t("login.login")}</button>
          </form>
          <div className="signup">
            <h4>
              {t("login.unregister")}{" "}
              <Link to="/signup">{t("login.register")}</Link>
            </h4>
          </div>
        </div>
      )}
      {hasLoginError && <strong>credentials are invalid</strong>}
    </div>
  );
}
