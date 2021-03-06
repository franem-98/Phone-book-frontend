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
  const [label, setLabel] = useState(null);
  const navigate = useNavigate();
  const secondLimit = 35;

  useEffect(() => {
    async function onMount() {
      const { data: contacts } = await getContacts();
      const existingContact = contacts.find((c) => c.number === number);
      if (existingContact) {
        setLabel(
          `${existingContact.firstName} ${existingContact.lastName}`.trim()
        );
      } else setLabel(number);
    }

    onMount();
  }, [number]);

  useEffect(() => {
    let timer = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [seconds]);

  const handleTimeout = async () => {
    await addCallToHistory(getData());
    setTimeout(() => {
      navigate("/callhistory");
    }, 4000);
  };

  const handleHangup = async () => {
    await addCallToHistory(getData());
    navigate("/callhistory");
  };

  const getData = () => {
    return {
      number,
      duration: seconds,
      endTime: new Date().toISOString(),
    };
  };

  if (seconds === secondLimit) handleTimeout();

  return (
    <div className="calling-page">
      {label && (
        <>
          <h1>Calling {label}...</h1>
          <Timer seconds={seconds} />
          {seconds === secondLimit && (
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
