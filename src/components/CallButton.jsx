import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function CallButton() {
  return (
    <Link className="call-button" to="/calling">
      <FontAwesomeIcon icon={faPhone} />
    </Link>
  );
}

export default CallButton;
