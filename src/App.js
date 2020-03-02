import React, { Component } from 'react';
import './App.css';

// import the other components
import Header from './Header';
import Inventory from './Inventory';
import Footer from './Footer';


class App extends Component {

  constructor(){
    super();

    this.state = {
      cartShown: false,
      cart: [],
    }
  }

  // make function that will catch when the cart is pressed
  handleCartShown = (formState) =>{

    // catch in variable to make new state
    const newState = formState;

    // set new state to the variable
    this.setState({
      cartShown: newState,
    })
  }

  // make a function that will save the cart to send to header
  handleUserCart = (cart) => {

    // catch in variable to make new state
    const newState = cart;

    // set new state to the variable
    this.setState({
      cart: newState,
    })

  }


  render(){
    return (
      <div>
        <Header cart = {this.state.cart} handleCartFunc = {this.handleCartShown} />
        <Inventory cartState = {this.state.cartShown} handleCartFunc = {this.handleCartShown} handleUserCartFunc= {this.handleUserCart}/>
        <Footer />
      </div>
    );
  }
}

export default App;
