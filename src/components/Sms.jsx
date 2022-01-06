import React from "react";

function Sms() {
  return (
    <>
      <h2 className="page-top">Text message</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            autoFocus
            placeholder="Enter number or contact name"
          />
        </div>
        <div className="mb-3">
          <textarea className="message-input" placeholder="Enter message..." />
        </div>
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
    </>
  );
}

export default Sms;
