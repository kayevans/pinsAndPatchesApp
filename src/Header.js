import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// // import firebase
// import firebase from './firebaseApp';

class Header extends Component{

    constructor(){
        super();

        this.state = {
            isCartShown: false,
        }
    }

    // make function to control when the handle cart func is called and setting state
    handleShowCart = () => {

        
        // make variable to set state
        let newCartState = this.isCartShown;
        
        // make it true
        newCartState = true;
        
        // set the state to the new state
        this.setState({
            isCartShown: newCartState,
            
            // wait for the state to set
        }, () => {
            this.sendToParent(this.state.isCartShown);
        })
    }

    // make function to send back to parent
    sendToParent = (stateOfForm) => {
        // call the parent function
        this.props.handleCartFunc(stateOfForm);
    }

    render(){
        return(
            <header>
                <nav>
                    <div className="wrapper">
                        <button onClick={this.handleShowCart} className="showCart">
                            <FontAwesomeIcon icon={faShoppingCart}/>
                        </button>
                    </div>
                </nav>
                <div className="wrapper">
                    <h1>pins n' patches</h1>
                </div>
            </header>
        )
    }
}

export default Header;