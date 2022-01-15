import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faPhone } from "@fortawesome/free-solid-svg-icons";
import api from "../API/fakeApi";

function Contacts() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    api
      .get("/contacts")
      .then((res) => {
        if (res.status !== 200) {
          throw Error("Could not get list of contacts.");
        }
        setContacts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (contacts && contacts.length === 0)
    return <p className="empty-list-warning">List of contacts is empty</p>;

  return (
    <>
      {contacts && (
        <table className="table">
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.number}>
                <td>
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.number}</td>
                <td>
                  <Link
                    className="change-on-hover"
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
      )}
    </>
  );
}

export default Contacts;
