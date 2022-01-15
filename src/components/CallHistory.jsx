import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPhone,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import api from "./../API/fakeApi";

function CallHistory() {
  const [history, setHistory] = useState(null);

  const getCallHistory = async () => {
    await api
      .get("/callhistory")
      .then((res) => {
        if (res.status !== 200) {
          throw Error("Could not get call history.");
        }
        setHistory(res.data.reverse());
      })
      .catch((err) => console.log(err.message));
  };

  const deleteCall = async (id) => {
    await api.delete(`/callhistory/${id}`);
  };

  useEffect(() => {
    getCallHistory();
  }, []);

  //implement delete function

  const handleDelete = async (id) => {
    const oldCallHistory = history;
    const newCallHistory = oldCallHistory.filter((c) => c.id !== id);
    setHistory(newCallHistory);
    try {
      deleteCall(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        console.log("Call has already been deleted");

      setHistory(oldCallHistory);
    }
  };

  if (history && history.length === 0)
    return <p className="empty-list-warning">Call history is empty</p>;

  return (
    <>
      {history && (
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
                    state={contact.name ? contact : null}
                  >
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                </td>
                <td>
                  <FontAwesomeIcon
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

export default CallHistory;
