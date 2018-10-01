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

  render() {
    return (
      <div>
        <form>
          <input
            onChange={this.handleChange}
            text="text"
            placeholder="NewRoomForm"
          />
        <button type="submit"></button>
        </form>
      </div>
    )
  }
}

export default NewRoomForm
