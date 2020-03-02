import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// import firebase
import firebase from './firebaseApp';

class Cart extends Component{

    constructor(){
        super();

        this.state = {
            dbRef: firebase.database().ref(),
            cartRef: firebase.database().ref('userCart'),
            subtotalRef: firebase.database().ref('subTotal'),
        }
    }

    // make function for removing items from cart
    handleRemoveFromCart = (itemKey, item) => {
        // remove the items by the keys
        this.state.cartRef.child(itemKey).remove();

        // use this to update subtotal
        let newSubtotal = this.props.subtotal;

        // subtract the price of item selected
        newSubtotal = newSubtotal - item.item.price;

        // add to the database
        this.state.subtotalRef.set(newSubtotal);

    }

    // make function for hiding cart
    handleHideCart = () => {
        // hide the cart by calling the parent function and make state false
        this.props.cartFunc(false);
    }
    

    render(){
        return(
            <div className="cart">
                <button onClick={this.handleHideCart} className="closeCart">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h3>YOUR CART:</h3>
                <h4>{this.props.cart.length} item(s) in cart</h4>
                {this.props.cart.map((currentItem)=>{
                    return(
                        <div className="itemInCart" key={currentItem.key}>
                            <img src={currentItem.item.image} alt={currentItem.item.name}/>
                            <h4>{currentItem.item.name}</h4>
                            <button onClick={()=>{this.handleRemoveFromCart(currentItem.key, currentItem)}} className="removeFromCart">remove from cart.</button>
                            <p>{currentItem.item.price}</p>
                        </div>
                    )
                })
                }
                <h4>Your total: ${(this.props.subtotal).toFixed(2)}</h4>
            </div>
        )
    }
}

export default Cart;