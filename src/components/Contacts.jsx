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

  const sortByFirstName = (contacts) => {
    return contacts.sort((a, b) => {
      if (a.firstName < b.firstName) return -1;
      if (a.firstName > b.firstName) return 1;
      return 0;
    });
  };

  useEffect(() => {
    async function onMount() {
      let { data: newContacts } = await getContacts();
      newContacts = sortByFirstName(newContacts);
      setContacts(newContacts);
    }
    onMount();
  }, []);

  const handleDelete = async (id) => {
    const oldContacts = contacts;
    let newContacts = oldContacts.filter((c) => c._id !== id);
    newContacts = sortByFirstName(newContacts);
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
            {contacts.map(({ _id, firstName, lastName, number }) => (
              <tr key={_id}>
                <td>
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                </td>
                <td>{`${firstName} ${lastName}`.trim()}</td>
                <td>{number}</td>
                <td>
                  <Link className="change-on-hover" to={`/contacts/${_id}`}>
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
                    onClick={() => handleDelete(_id)}
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
