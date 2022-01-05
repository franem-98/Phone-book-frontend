import React from "react";
import CallButton from "./CallButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Contacts() {
  const myContacts = [
    { name: "Person 1", number: "1234" },
    { name: "Person 2", number: "5678" },
    { name: "Person 3", number: "9101112" },
  ];

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
              <CallButton />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Contacts;
