import React from "react";

function CallHistory() {
  const history = [];

  if (history.length === 0)
    return <p className="empty-list-warning">Call history is empty</p>;

  return <h1>Previous calls</h1>;
}

export default CallHistory;
