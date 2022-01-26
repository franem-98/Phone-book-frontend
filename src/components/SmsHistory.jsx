import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getContacts } from "../services/contactService";
import { getMessages, deleteMessage } from "../services/smsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

function SmsHistory() {
  const [history, setHistory] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function onMount() {
      const { data: newHistory } = await getMessages();
      const { data: myContacts } = await getContacts();
      setHistory(newHistory.reverse());
      setContacts(myContacts);
    }
    onMount();
  }, []);

  const handleDelete = async (id) => {
    const oldSmsHistory = history;
    const newSmsHistory = oldSmsHistory.filter((c) => c._id !== id);
    setHistory(newSmsHistory);
    try {
      await deleteMessage(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        console.log("Call has already been deleted");

      setHistory(oldSmsHistory);
    }
  };

  const getLabel = (number) => {
    const existingContact = contacts.find((c) => c.number === number);
    return existingContact
      ? `${existingContact.firstName} ${existingContact.lastName}`.trim()
      : number;
  };

  if (history && history.length === 0)
    return <p className="empty-list-warning">SMS history is empty.</p>;

  return (
    <>
      <table className="table">
        <tbody>
          {history.map(({ _id, number, timestamp, message }) => (
            <tr key={_id}>
              <td>
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </td>
              <td>{getLabel(number)}</td>
              <td>{timestamp}</td>
              <td
                className="message-container"
                onClick={() => navigate(`/smshistory/${_id}`)}
              >
                {message.length > 40
                  ? `${message.substring(0, 40)}...`
                  : message}
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
    </>
  );
}

export default SmsHistory;
