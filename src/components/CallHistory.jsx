import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone } from "@fortawesome/free-solid-svg-icons";
import { history } from "./Calling";

function CallHistory() {
  if (history.length === 0)
    return <p className="empty-list-warning">Call history is empty</p>;

  return (
    <table className="table">
      <tbody>
        {history.map(({ contact, duration, endTime }) => (
          <tr key={duration}>
            <td>
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </td>
            <td>{contact.name || contact}</td>
            <td>{duration}</td>
            <td>{endTime.toString()}</td>
            <td>
              <Link
                className="change-on-hover"
                to={`/calling/${contact.number || contact}`}
                state={contact.name ? contact : null}
              >
                <FontAwesomeIcon icon={faPhone} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CallHistory;
