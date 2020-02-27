import React, { Component } from 'react';

// import firebase
import firebase from './firebaseApp';

class Cart extends Component{

    constructor(){
        super();

        this.state = {
            dbRef: firebase.database().ref(),
            cartRef: firebase.database().ref('userCart'),
        }
    }

    // make function for removing items from cart
    handleRemoveFromCart = (itemKey) => {
        // remove the items by the keys
        this.state.cartRef.child(itemKey).remove();
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
                            <button onClick={()=>{this.handleRemoveFromCart(currentItem.key)}} className="removeFromCart">remove from cart.</button>
                            <p>{currentItem.item.price}</p>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}

export default Cart;