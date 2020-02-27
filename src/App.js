import React, { Component } from 'react';

// import firebase
import firebase from './firebaseApp';

// import the other components
import Header from './Header';
import Inventory from './Inventory';
import Cart from './Cart';


class App extends Component {
  render(){
    return (
      <div>
        <Header />
        <Inventory />
        <Cart />
      </div>
    );
  }
}

export default App;
