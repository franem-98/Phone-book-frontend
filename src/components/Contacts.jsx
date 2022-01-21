import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getContacts, deleteContact } from "./../services/contactService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faTrash,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";

function Contacts() {
  const [contacts, setContacts] = useState(null);

  useEffect(() => {
    async function setState() {
      const { data: newContacts } = await getContacts();
      setContacts(newContacts);
    }
    setState();
  }, []);

  const handleDelete = async (id) => {
    const oldContacts = contacts;
    const newContacts = oldContacts.filter((c) => c.id !== id);
    setContacts(newContacts);
    try {
      await deleteContact(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        console.log("Contact has already been deleted.");

      setContacts(oldContacts);
    }
  };

  if (contacts && contacts.length === 0)
    return <p className="empty-list-warning">List of contacts is empty.</p>;

  return (
    <>
      {contacts && (
        <table className="table">
          <tbody>
            {contacts.map(({ id, label, number }) => (
              <tr key={id}>
                <td>
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </td>
                <td>{label}</td>
                <td>{number}</td>
                <td>
                  <Link className="change-on-hover" to={`/contacts/${id}`}>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </Link>
                </td>
                <td>
                  <Link className="change-on-hover" to={`/calling/${number}`}>
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                </td>
                <td>
                  <FontAwesomeIcon
                    className="change-on-hover"
                    icon={faTrash}
                    onClick={() => handleDelete(id)}
                  />
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
