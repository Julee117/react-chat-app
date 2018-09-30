import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';
import Chatkit from '@pusher/chatkit';

class App extends Component {

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
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onNewMessage: message => {
              console.log('Received new message: ', message.text)
            }
          },
          messageLimit: 20
        })
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <MessageList />
      </div>
    );
  }
}

export default App;
