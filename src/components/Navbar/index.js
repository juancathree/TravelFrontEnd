import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobeAmericas,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function Menu() {
  return (
    <nav className="menu">
      <a className="menu-item" href="/">
        <FontAwesomeIcon
          className="menu-item-icon"
          icon={faGlobeAmericas}
          size="2x"
        />
      </a>
      <a className="menu-item" href="/">
        <FontAwesomeIcon
          className="menu-item-icon"
          icon={faPlaneDeparture}
          size="2x"
        />
      </a>
      <a className="menu-item" href="/">
        <FontAwesomeIcon className="menu-item-icon" icon={faUser} size="2x" />
      </a>
    </nav>
  );
}
