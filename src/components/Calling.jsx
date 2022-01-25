import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSlash } from "@fortawesome/free-solid-svg-icons";
import { addCallToHistory } from "../services/callService";
import { getContacts } from "../services/contactService";
import Timer from "./Timer";

function Calling() {
  const { number } = useParams();
  const [seconds, setSeconds] = useState(0);
  const [callTimedOut, setCallTimedOut] = useState(false);
  const [label, setLabel] = useState(number);
  const [data, setData] = useState({
    number,
    duration: "",
    endTime: "",
  });
  const navigate = useNavigate();
  const secondLimit = 35;

  useEffect(() => {
    async function onMount() {
      const { data: contacts } = await getContacts();
      const existingContact = contacts.find((c) => c.number === number);
      if (existingContact) {
        existingContact.lastName
          ? setLabel(`${existingContact.firstName} ${existingContact.lastName}`)
          : setLabel(`${existingContact.firstName}`);
      }
    }

    onMount();
  }, [number]);

  useEffect(() => {
    setData((data) => {
      return {
        ...data,
        duration: seconds,
        endTime: new Date().toISOString(),
      };
    });

    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds, callTimedOut]);

  const handleTimeout = async () => {
    await addCallToHistory(data);
    setTimeout(() => {
      navigate(-1);
    }, 4000);
  };

  const handleHangup = async () => {
    await addCallToHistory(data);
    navigate(-1);
  };

  if (seconds === secondLimit) setCallTimedOut(true);
  if (callTimedOut) handleTimeout();

  return (
    <div className="calling-page">
      {label && (
        <>
          <h1>Calling {label}...</h1>
          <Timer seconds={seconds} />
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
