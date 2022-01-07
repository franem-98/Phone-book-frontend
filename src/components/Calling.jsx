import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SecondCounter from "./SecondCounter";

//add seconds counter

function Calling() {
  const { id } = useParams();
  const location = useLocation();
  const contact = location.state;

  const contactId = contact ? contact.name : id;

  return (
    <div className="calling-page">
      <h1>Calling {contactId}...</h1>
      <SecondCounter />
    </div>
  );
}

export default Calling;
