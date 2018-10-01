import React from 'react';

class SendMessageForm extends React.Component {
  constructor() {
    super();

    this.state = {
      message: ""
    }
  }

  handleChange = event => {
    this.setState({
      message: event.target.value
    })
  }

  render() {
    return (
      <form>
        <input
          onChange={this.handleChange}
          placeholder="Type your message and hit Enter"
          type="text"
          value={this.state.message}
        />
      </form>
    )
  }
}

export default SendMessageForm
