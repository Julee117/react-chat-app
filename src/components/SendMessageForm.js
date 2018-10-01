import React from 'react';

class SendMessageForm extends React.Component {

  render() {
    return (
      <form>
        <input
          onChange={this.handleChange}
          placeholder="Type your message and hit Enter"
          type="text"
        />
      </form>
    )
  }
}

export default SendMessageForm
