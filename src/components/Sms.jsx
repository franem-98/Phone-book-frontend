import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";
import { getMessage } from "../services/smsService";

function Sms() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    const onMount = async () => {
      try {
        const messageId = id;
        const { data: newMessageData } = await getMessage(messageId);
        setMessageData(newMessageData);
      } catch (err) {
        if (err.response && err.response.status === 404)
          navigate("/notfound", { replace: true });
      }
    };

    onMount();
  }, [id, navigate]);

  return (
    messageData && (
      <table className="table">
        <tbody>
          <tr key="To">
            <td>To: {messageData.contactLabel}</td>
          </tr>
          <tr key="Timestamp">
            <td>{messageData.timestamp}</td>
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
