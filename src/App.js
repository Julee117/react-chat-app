import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import Chatkit from '@pusher/chatkit';

class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
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
        this.currentUser.subscribeToRoom({
          roomId: this.currentUser.rooms[0].id,
          hooks: {
            onNewMessage: message => {
              console.log('Received new message: ', message.text)
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          },
          messageLimit: 20
        })
      })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.currentUser.rooms[0].id
    })
  }

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
