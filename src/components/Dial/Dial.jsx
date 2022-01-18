import { useReducer } from "react";
import DigitButton from "./DigitButton";
import DeleteButton from "./DeleteButton";
import CallButton from "./CallButton";
import "./dial.css";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CALL_NUMBER: "call-number",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        number: `${state.number || ""}${payload.digit}`,
      };
    case ACTIONS.DELETE_DIGIT:
      if (!state.number || state.number.length === 0) return {};
      return {
        ...state,
        number: state.number.slice(0, -1),
      };
    default:
      return null;
  }
}

function Dial() {
  const [{ number }, dispatch] = useReducer(reducer, {});

  return (
    <div className="dial-grid">
      <div className="number-display">{number}</div>
      <DeleteButton dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <DigitButton digit="*" dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="#" dispatch={dispatch} />
      <CallButton number={number} />
    </div>
  );
}

export default Dial;
