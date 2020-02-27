import React, { Component } from 'react';
import './App.css';

// import firebase
// import firebase from './firebaseApp';

// import the other components
import Header from './Header';
import Inventory from './Inventory';


class App extends Component {
  render(){
    return (
      <div>
        <Header />
        <Inventory />
      </div>
    );
  }
}

export default App;
