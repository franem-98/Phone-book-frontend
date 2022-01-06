import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone } from "@fortawesome/free-solid-svg-icons";

export const myContacts = [
  { name: "Person 1", number: "1234" },
  { name: "Person 2", number: "5678" },
  { name: "Person 3", number: "9101112" },
];

function Contacts() {
  if (myContacts.length === 0)
    return <p className="empty-list-warning">List of contacts is empty</p>;

  return (
    <table className="table">
      <tbody>
        {myContacts.map((contact) => (
          <tr key={contact.number}>
            <td>
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            </td>
            <td>{contact.name}</td>
            <td>{contact.number}</td>
            <td>
              <Link
                className="call-button"
                to={`/calling/${contact.number}`}
                state={contact}
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

export default Contacts;
