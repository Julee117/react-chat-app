import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import Rooms from './components/Rooms';
import NewRoomForm from './components/NewRoomForm';
import Chatkit from '@pusher/chatkit';

class App extends Component {

  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
  }

  componentDidMount() {
    const tokenProvider = new Chatkit.TokenProvider({
      url: process.env.REACT_APP_TOKENURL
    })

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: process.env.REACT_APP_INSTANCELOCATOR,
      userId: process.env.REACT_APP_USER,
      tokenProvider: tokenProvider
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;

        this.getRooms()
      })
      .catch(err => {
        console.log(`Error on connecting: ${err}`)
      })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
      .catch( err => {
        console.log(`Error on joinableRooms: ${err}`)
      })
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      },
      messageLimit: 20
    })
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => {
      console.log(`Error on subscribing to room: ${err}`)
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    })
  }

  createRoom(name) {
    this.currentUser.createRoom({
      name
    })
    .then(room => {
      this.subscribeToRoom(room.id)
    })
    .catch(err => {
      console.log(`Error with createRoom: ${err}`)
    })
  }

  render() {
    return (
      <div className="App">
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}/>
        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage}/>
        <Rooms
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <NewRoomForm createRoom={this.createRoom}/>
      </div>
    );
  }
}

export default App;
