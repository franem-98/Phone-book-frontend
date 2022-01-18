import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "../services/smsService";

function NewSms() {
  const [data, setData] = useState({ contact: "", message: "" });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);
  };

  const doSubmit = async (e) => {
    e.preventDefault();
    await sendMessage({
      contact: `${data.contact}`,
      message: `${data.message}`,
    });

    navigate("/smshistory");
  };

  return (
    <>
      <h2 className="page-top">Text message</h2>
      <form onSubmit={doSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="contact"
            value={data.contact}
            onChange={handleChange}
            autoFocus
            placeholder="Enter number or contact name"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="message-input"
            name="message"
            value={data.message}
            onChange={handleChange}
            placeholder="Enter message..."
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </>
  );
}

export default NewSms;
