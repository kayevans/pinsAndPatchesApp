import React, { Component } from 'react';

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

    render(){
        return(
            <div className="cart">
                <h3>YOUR CART:</h3>
                <h4>{this.props.cart.length} item(s) in cart</h4>
                {this.props.cart.map((currentItem)=>{
                    return(
                        <div className="itemInCart" key={currentItem.key}>
                            <h4>{currentItem.item.name}</h4>
                            <button onClick={()=>{this.handleRemoveFromCart(currentItem.key, currentItem)}} className="removeFromCart">remove from cart.</button>
                            <p>{currentItem.item.price}</p>
                        </div>
                    )
                })
                }
                <h4>Your subtotal: ${this.props.subtotal}</h4>
            </div>
        )
    }
}

export default Cart;