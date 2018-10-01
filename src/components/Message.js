import React from 'react';

const Message = ({message}) =>
  <div key={message.index}>
    <div>{message.senderID}</div>
    <div>{message.text}</div>
  </div>

export default Message;
