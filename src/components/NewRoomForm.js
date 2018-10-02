import React from 'react';

class NewRoomForm extends React.Component {
  constructor() {
    super();

    this.state = {
      roomName: ""
    }
  }

  handleChange = event => {
    this.setState({
      roomName: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createRoom(this.state.roomName)
    this.setState({
      roomName: ""
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            onChange={this.handleChange}
            text="text"
            placeholder="NewRoomForm"
            value={this.state.roomName}
          />
        <button type="submit">+</button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm
