import React from 'react';

function Message(props) {
  return (
    <div>
      <div>{props.username}</div>
      <div>{props.text}</div>
    </div>
  )
}

export default Message;
