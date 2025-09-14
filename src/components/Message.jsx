import React from "react";

function Message({ sender, text, time }) {
  return (
    <div className={`message ${sender}`}>
      <div className="bubble">{text}</div>
      <span className="timestamp">{time}</span>
    </div>
  );
}

export default Message;


