import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { getMessage } from "../services/smsService";
import { getContacts } from "./../services/contactService";

function Sms() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageData, setMessageData] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const onMount = async () => {
      try {
        const messageId = id;
        const { data: newMessageData } = await getMessage(messageId);
        const { data: newContacts } = await getContacts();
        setMessageData(newMessageData);
        setContacts(newContacts);
      } catch (err) {
        if (err.response && err.response.status === 404)
          navigate("/notfound", { replace: true });
      }
    };

    onMount();
  }, [id, navigate]);

  const getLabel = (number) => {
    const existingContact = contacts.find((c) => c.number === number);
    return existingContact
      ? `${existingContact.firstName} ${existingContact.lastName}`.trim()
      : number;
  };

  return (
    messageData && (
      <table className="table">
        <tbody>
          <tr key="Timestamp">
            <td>Sent: {messageData.timestamp}</td>
          </tr>
          <tr key="To">
            <td>To: {getLabel(messageData.number)}</td>
          </tr>
          <tr key="Message">
            <td>{messageData.message}</td>
          </tr>
        </tbody>
      </table>
    )
  );
}

export default Sms;
