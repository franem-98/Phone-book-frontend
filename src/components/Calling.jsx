import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addCallToHistory } from "../services/callService";
import { getContacts } from "../services/contactService";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";

//FIX THIS!!!

function Calling() {
  const [contact, setContact] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [callTimedOut, setCallTimedOut] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const secondLimit = 35;

  useEffect(() => {
    async function setState() {
      const { data: contacts } = await getContacts();
      const existingContact = contacts.find((c) => c.number === id);
      if (existingContact)
        setContact(`${existingContact.firstName} ${existingContact.lastName}`);
      else setContact(id);
    }
    setState();
  }, [id]);

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [id, contact, seconds, callTimedOut]);

  const call = {
    contact,
    duration: seconds,
    endTime: moment().format("DD/MM/YYYY HH:mm").toString(),
  };

  const handleTimeout = async () => {
    await addCallToHistory(call);
    setTimeout(() => {
      navigate(-1);
    }, 4000);
  };

  const handleHangup = async () => {
    await addCallToHistory(call);
    navigate(-1);
  };

  if (seconds === secondLimit) setCallTimedOut(true);
  if (callTimedOut) handleTimeout();

  console.log(seconds);

  return (
    <div className="calling-page">
      {contact && (
        <>
          <h1>Calling {contact}...</h1>
          <h2>{seconds}</h2>
          {callTimedOut && (
            <p>Person is not answering. Please try again later.</p>
          )}
          <FontAwesomeIcon
            className="hangup-icon"
            onClick={handleHangup}
            icon={faPhoneSlash}
            size="2x"
          />
        </>
      )}
    </div>
  );
}

export default Calling;
