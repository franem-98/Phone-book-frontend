import React from "react";
import { useLocation, useParams } from "react-router-dom";

function Calling() {
  const { id } = useParams();
  const location = useLocation();
  const contact = location.state;

  let contactId = contact ? contact.name : id;

  return <h1>Calling {contactId}...</h1>;
}

export default Calling;
