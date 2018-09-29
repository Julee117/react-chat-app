import React, { Component } from 'react';
import './App.css';
import MessageList from './components/MessageList';

class App extends Component {
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
