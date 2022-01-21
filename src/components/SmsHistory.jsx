import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMessages, deleteMessage } from "../services/smsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

function SmsHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

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

  if (history && history.length === 0)
    return <p className="empty-list-warning">SMS history is empty.</p>;

  return (
    <>
      <table className="table">
        <tbody>
          {history.map(({ id, contactLabel, timestamp, message }) => (
            <tr key={id}>
              <td>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </td>
              <td>{contactLabel}</td>
              <td>{timestamp}</td>
              <td
                className="message-container"
                onClick={() => navigate(`/smshistory/${id}`)}
              >
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
