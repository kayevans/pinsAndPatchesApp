import React, { Component } from 'react';

// import firebase
import firebase from './firebaseApp';

class Cart extends Component{

    // constructor(){
    //     super();

    //     this.state = {
    //         dbRef: firebase.database().ref(),
    //         cartRef: firebase.database().ref('userCart'),
    //     }
    // }

    render(){
        return(
            <div className="cart">
                <h3>YOUR CART:</h3>
                {this.props.cart.map((currentItem)=>{
                    return(
                        <div className="itemInCart" key={currentItem.key}>
                            <h4>{currentItem.item.name}</h4>
                            <button className="removeFromCart">remove from cart.</button>
                            <p>{currentItem.item.inventory}</p>
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