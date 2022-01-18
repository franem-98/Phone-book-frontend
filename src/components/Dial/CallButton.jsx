import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquare } from "@fortawesome/free-solid-svg-icons";

function CallButton({ number }) {
  const navigate = useNavigate();

  const callNumber = (number) => {
    navigate(`/calling/${number}`);
  };

  return (
    <button className="call-button" onClick={() => callNumber(number)}>
      <FontAwesomeIcon icon={faPhoneSquare} />
    </button>
  );
}

export default CallButton;
