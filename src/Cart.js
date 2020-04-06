import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

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
        // fix it to two decimals and parse float it to mkae number again
        newSubtotal = parseFloat((newSubtotal - item.item.price).toFixed(2));

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
                <div className="wrapper">
                    <button onClick={this.handleHideCart} className="closeCart" tabindex="1">
                        <FontAwesomeIcon icon={faTimes} aria-label="Close the cart"/>
                    </button>
                    <h2>Your cart</h2>
                    <h4 className="amountInCart">{this.props.cart.length} item(s) in cart</h4>
                    {this.props.cart.map((currentItem)=>{
                        return(
                            <div className="itemInCart" key={currentItem.key}>
                                <div className="imgCont">
                                    <img src={currentItem.item.image} alt={currentItem.item.name}/>
                                </div>
                                <div className="written">
                                    <h4>{currentItem.item.name}</h4>
                                    <p>${currentItem.item.price} CAD</p>
                                    <button onClick={()=>{this.handleRemoveFromCart(currentItem.key, currentItem)}} className="removeFromCart" tabindex="1">
                                        <FontAwesomeIcon icon={faTrash} aria-label="Remove this item"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                    }
                    <h4 className="price">Your total: ${(this.props.subtotal).toFixed(2)}</h4>
                    {/* if the cart is empty, dont show the buy button */}
                    {this.props.cart.length === 0 ? null : <a className="buyButton buttonStyles" href="https://www.etsy.com/ca/shop/RambleOnSupplyCo?ref=simple-shop-header-name&listing_id=724280711" tabindex="1" target="_blank">Buy now</a>}    
                </div>
            </div>
        )
    }
}

export default Cart;