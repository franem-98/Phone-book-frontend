import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCallHistory, deleteCall } from "../services/callService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function CallHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function setState() {
      const { data: newHistory } = await getCallHistory();
      setHistory(newHistory.reverse());
    }
    setState();
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

  if (history && history.length === 0)
    return <p className="empty-list-warning">Call history is empty.</p>;

  return (
    <>
      <table className="table">
        <tbody>
          {history.map(({ id, contact, duration, endTime }) => (
            <tr key={id}>
              <td>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </td>
              <td>{contact.name || contact}</td>
              <td>{duration}</td>
              <td>{endTime}</td>
              <td>
                <Link
                  className="change-on-hover"
                  to={`/calling/${contact.number || contact}`}
                >
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
