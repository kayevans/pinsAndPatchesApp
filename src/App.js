import React, { Component } from 'react';
import './App.css';

// import firebase
// import firebase from './firebaseApp';

// import the other components
import Header from './Header';
import Inventory from './Inventory';


class App extends Component {

  constructor(){
    super();

    this.state = {
      cartShown: false,
    }
  }

  // make function that will catch when the cart is pressed
  handleCartShown = (formState) =>{
    console.log(formState);

    // catch in variable to make new state
    const newState = formState;

    // set new state to the variable
    this.setState({
      cartShown: newState,

    }, ()=>{
      console.log(this.state.cartShown);
    })
  }


  render(){
    return (
      <div>
        <Header handleCartFunc = {this.handleCartShown} />
        <Inventory />
      </div>
    );
  }
}

export default App;
