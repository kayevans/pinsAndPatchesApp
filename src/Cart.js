import React, { Component } from 'react';

// import firebase
import firebase from './firebaseApp';

class Cart extends Component{

    constructor(){
        super();

        this.state = {
            dbRef: firebase.database().ref(),
        }
    }

    render(){
        return(
            <div className="cart">
                <h3>YOUR CART:</h3>
            </div>
        )
    }
}

export default Cart;