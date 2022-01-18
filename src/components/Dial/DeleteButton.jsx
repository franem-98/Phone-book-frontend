import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
import { ACTIONS } from "./Dial";

function DeleteButton({ dispatch }) {
  return (
    <button
      className="delete"
      onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
    >
      <FontAwesomeIcon icon={faBackspace} />
    </button>
  );
}

export default DeleteButton;
