import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import mongoose from "mongoose";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import api from "./../API/fakeApi";

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

    if (callTimedOut) clearInterval(timer);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, callTimedOut]);

  const pushToCallHistory = async () => {
    await api.post("/callhistory", {
      id: mongoose.Types.ObjectId(),
      contact: contact ? contact : id,
      duration: seconds,
      endTime: moment(new Date()).format("DD/MM/YYYY HH:MM").toString(),
    });
  };

  const handleTimeout = () => {
    pushToCallHistory();
    setTimeout(() => {
      navigate(-1);
    }, 4000);
  };

  const handleHangup = () => {
    pushToCallHistory();
    navigate(-1);
  };

  if (seconds === secondLimit) setCallTimedOut(true);
  if (callTimedOut) handleTimeout();

  return (
    <div className="calling-page">
      <h1>Calling {contactId}...</h1>
      <h2>{seconds}</h2>
      {callTimedOut && <p>Person is not answering. Please try again later.</p>}
      <FontAwesomeIcon
        className="hangup-icon"
        onClick={handleHangup}
        icon={faPhoneSlash}
        size="2x"
      />
    </div>
  );
}

export default Calling;
