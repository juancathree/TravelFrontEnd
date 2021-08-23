import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const [t] = useTranslation("global");
  const handleSubmit = (e) => {};

  return (
    <div className="container">
      <div className="form">
        <form onSubmit={handleSubmit} className="signin">
          <h2 className="title">{t("signup.title")}</h2>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input
              className="input"
              type="text"
              placeholder={t("signup.name")}
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <input
              className="input"
              type="email"
              placeholder={t("signup.email")}
            />
          </div>
          <div className="input-field">
            <FontAwesomeIcon className="icon" icon={faLock} />
            <input
              className="input"
              type="password"
              placeholder={t("signup.password")}
            />
          </div>
          <button className="btn">{t("signup.signup")}</button>
        </form>
        <div className="signup">
          <h4>
            {t("signup.registered")}{" "}
            <Link to="/login">{t("signup.login")}</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}
