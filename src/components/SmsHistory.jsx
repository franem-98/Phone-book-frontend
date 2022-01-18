import { useState, useEffect } from "react";
import { getMessages, deleteMessage } from "../services/smsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

function SmsHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function setState() {
      const { data: newHistory } = await getMessages();
      setHistory(newHistory.reverse());
    }
    setState();
  }, []);

  const handleDelete = async (id) => {
    const oldSmsHistory = history;
    const newSmsHistory = oldSmsHistory.filter((c) => c.id !== id);
    setHistory(newSmsHistory);
    try {
      await deleteMessage(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        console.log("Call has already been deleted");

      setHistory(oldSmsHistory);
    }
  };

  return (
    <>
      <table className="table">
        <tbody>
          {history.map(({ id, contact, message }) => (
            <tr key={id}>
              <td>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </td>
              <td>{contact}</td>
              <td className="message-container">
                {message.length > 40
                  ? `${message.substring(0, 40)}...`
                  : message}
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

export default SmsHistory;
