import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCallHistory, deleteCall } from "../services/callService";
import { getContacts } from "./../services/contactService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CallHistory() {
  const [history, setHistory] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function onMount() {
      const { data: newHistory } = await getCallHistory();
      const { data: myContacts } = await getContacts();
      setHistory(newHistory.reverse());
      setContacts(myContacts);
    }
    onMount();
  }, []);

  const handleDelete = async (id) => {
    const oldCallHistory = history;
    const newCallHistory = oldCallHistory.filter((c) => c.id !== id);
    setHistory(newCallHistory);
    try {
      await deleteCall(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        console.log("Call has already been deleted");

      setHistory(oldCallHistory);
    }
  };

  const getLabel = (number) => {
    const existingContact = contacts.find((c) => c.number === number);
    return existingContact
      ? `${existingContact.firstName} ${existingContact.lastName}`
      : number;
  };

  if (history && history.length === 0)
    return <p className="empty-list-warning">Call history is empty.</p>;

  return (
    <>
      <table className="table">
        <tbody>
          {history.map(({ id, number, duration, endTime }) => (
            <tr key={id}>
              <td>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </td>
              <td>{getLabel(number)}</td>
              <td>{duration}s</td>
              <td>{endTime}</td>
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
    </>
  );
}

export default CallHistory;
