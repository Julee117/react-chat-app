import React, { Component } from 'react';

class Rooms extends React.Component {
  render() {
    return (
      <div>
        <h3>Your rooms:</h3>
        {this.props.rooms.map(room => {
          return (
            <li key={room.id}>
              <a
                onClick={() => {this.props.subscribeToRoom(room.id)}}
                href="#">
                # {room.name}
              </a>
            </li>
          )
        })}
      </div>
    )
  }
}

export default Rooms
