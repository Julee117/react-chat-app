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

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.sendMessage(this.state.message)
    this.setState({
      message: ""
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
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
