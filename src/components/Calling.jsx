import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

//add seconds counter

function Calling() {
  const [seconds, setSeconds] = useState(0);
  const [callTimedOut, setCallTimedOut] = useState(false);
  const { id } = useParams();
  const { state: contact } = useLocation();
  const navigate = useNavigate();
  const secondLimit = 35;

  const contactId = contact ? contact.name : id;

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    if (seconds === secondLimit) {
      setCallTimedOut(true);
      clearInterval(timer);
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    }

    return () => clearInterval(timer);
  }, [seconds, setSeconds, navigate]);

  return (
    <div className="calling-page">
      <h1>Calling {contactId}...</h1>
      <h2>{seconds}</h2>
      {callTimedOut && <p>Person is not answering. Please try again later.</p>}
    </div>
  );
}

export default Calling;
