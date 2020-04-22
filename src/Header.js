import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from './mainLogo.png';

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

    // make function to send cart state back to parent
    sendToParent = (stateOfForm) => {
        // call the parent function
        this.props.handleCartFunc(stateOfForm);
    }

    render(){
        return(
            <header>
                <nav>
                    <div className="wrapper">
                        <div className="shoppingCart">
                            <button onClick={this.handleShowCart} className="showCart" tabIndex="1" aria-label="Show your shopping cart">
                                <FontAwesomeIcon icon={faShoppingCart} aria-hidden="true"/>
                            </button>
                            <p>{this.props.cart.length}</p>
                        </div>
                    </div>
                </nav>
                <div className="wrapper">
                    <img src={logo} alt="Pins and Patches" aria-label="Pins and Patches" title="Pins and Patches"/>
                </div>
            </header>
        )
    }
}

export default Header;