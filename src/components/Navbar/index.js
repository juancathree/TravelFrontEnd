import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobeAmericas,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./styles.css";

export default memo(function Navbar() {
  return (
    <nav className="menu">
      <Link className="menu-item" to="/">
        <FontAwesomeIcon
          className="menu-item-icon"
          icon={faGlobeAmericas}
          size="2x"
        />
      </Link>
      <Link className="menu-item" to="/travels">
        <FontAwesomeIcon
          className="menu-item-icon"
          icon={faPlaneDeparture}
          size="2x"
        />
      </Link>
      <Link className="menu-item" to="/user">
        <FontAwesomeIcon className="menu-item-icon" icon={faUser} size="2x" />
      </Link>
    </nav>
  );
});
