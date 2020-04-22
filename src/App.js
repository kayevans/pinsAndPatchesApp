import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './App.css';

// import the other components
import Header from './Header';
import Inventory from './Inventory';
import Footer from './Footer';


class App extends Component {

  constructor(){
    super();

    // make top of page reference
    this.topOfPage = React.createRef();

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

  // make a function that will scroll to the top of the page
  handleScrollToTop = () => {
    window.scrollTo(0, this.topOfPage.current.offsetTop);
  }


  render(){
    return (
      <div>
        <Header cart = {this.state.cart} handleCartFunc = {this.handleCartShown} ref={this.topOfPage}/>
        <Inventory cartState = {this.state.cartShown} handleCartFunc = {this.handleCartShown} handleUserCartFunc= {this.handleUserCart}/>
        <Footer />
        {/* back to top button */}
        <button className="backToTop" onClick = {this.handleScrollToTop} aria-label="Go to the top of page">
          <FontAwesomeIcon icon={faArrowUp} aria-hidden="true"/>
        </button>
      </div>
    );
  }
}

export default App;
