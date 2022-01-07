import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SecondCounter() {
  const [seconds, setSeconds] = useState(30);
  const [callTimedOut, setCallTimedOut] = useState(false);
  const navigate = useNavigate();

  //const handleTimeOut = setTimeout(navigate(-1), 5000);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
    }, 1000);

    if (seconds === 35) {
      setCallTimedOut(true);
      //handleTimeOut();
      return clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      //clearTimeout(handleTimeOut);
      setCallTimedOut(false);
    };
  }, [seconds]);

  return (
    <div>
      <h1>{seconds}</h1>
      {callTimedOut && <p>Person is not answering. PleaseTry again later.</p>}
    </div>
  );
}

export default SecondCounter;
