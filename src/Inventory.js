import React, { Component } from 'react';

// import firebase
import firebase from './firebaseApp';

// import the cart
import Cart from './Cart';

class Inventory extends Component{

    constructor(){
        super();

        this.state = {
            dbRef: firebase.database().ref(),
            cartRef: firebase.database().ref('userCart'),
            inventoryToShow: [],
            userCart: [],
        }
    }

    // initial render
    componentDidMount = () => {
        // get values from firebase
        this.state.dbRef.on('value', (response)=>{

            // get the data
            const dataFromDb = response.val();

            // make variable to set the state
            const stateToSet = [];

            // loops through the pins and add to state to set
            for(let key in dataFromDb.pins){
                stateToSet.push(dataFromDb.pins[key]);
            }

            // loops through the patches and adds to the state to set
            for(let key in dataFromDb.patches){
                stateToSet.push(dataFromDb.patches[key]);
            }

            // set the state to the new inventory
            this.setState({
                inventoryToShow: stateToSet,
            })
        })

        // set up cart for firebase
        this.state.cartRef.on('value', (response)=>{
            // make empty array to set new state
            const stateToSet = [];
            // capture the value of the response
            const dataFromDb = response.val();

            // loop through the data, create object to put into firebase
            for(let key in dataFromDb){
                const userItems = {
                    key: key,
                    item: dataFromDb[key],
                }

                // push the data object to the empty array
                stateToSet.push(userItems);
            }

            // change the state to the new data
            this.setState({
                userCart: stateToSet,
            })

        })
    }

    // make a function to show just the pins
    handleShowPins = () => {
        // get values from firebase
        this.state.dbRef.on('value', (response)=>{

            // get the data
            const dataFromDb = response.val();

            // make variable to set the state
            const stateToSet = [];

            // loops through the pins and add to state to set
            for(let key in dataFromDb.pins){
                stateToSet.push(dataFromDb.pins[key]);
            }

            // set the state to the new inventory
            this.setState({
                inventoryToShow: stateToSet,
            })
        })
    }

    // make a function to show just the patches
    handleShowPatches = () => {
        // get values from firebase
        this.state.dbRef.on('value', (response)=>{

            // get the data
            const dataFromDb = response.val();

            // make variable to set the state
            const stateToSet = [];

            // loops through the pins and add to state to set
            for(let key in dataFromDb.patches){
                stateToSet.push(dataFromDb.patches[key]);
            }

            // set the state to the new inventory
            this.setState({
                inventoryToShow: stateToSet,
            })
        })
    }

    // make a function to show all of the items
    handleShowAll = () => {
        // get values from firebase
        this.state.dbRef.on('value', (response)=>{

            // get the data
            const dataFromDb = response.val();

            // make variable to set the state
            const stateToSet = [];

            // loops through the pins and add to state to set
            for(let key in dataFromDb.pins){
                stateToSet.push(dataFromDb.pins[key]);
            }

            // loops through the patches and adds to the state to set
            for(let key in dataFromDb.patches){
                stateToSet.push(dataFromDb.patches[key]);
            }

            // set the state to the new inventory
            this.setState({
                inventoryToShow: stateToSet,
            })
        })
    }

    // make a function to add items to the cart
    handleAddToCart = (specificItem) => {

        // add to the database
        this.state.cartRef.push(specificItem);
    }

    
    render(){
        return(
            <main className="inventory">
                <div>
                    <h2>inventory:</h2>
                    <nav className="sideNav">
                        <ul>
                            <li><a href="#" onClick={this.handleShowAll}>All</a></li>
                            <li><a href="#" onClick={this.handleShowPins}>Pins</a></li>
                            <li><a href="#" onClick={this.handleShowPatches}>Patches</a></li>
                        </ul>
                    </nav>
                    <section className="displayInventory">
                        {this.state.inventoryToShow.map((currentItem, index)=>{
                                return(
                                    <div key={index}>
                                        <h3>{currentItem.name}</h3>
                                        <button onClick={()=>{this.handleAddToCart(currentItem)}} className="addToCart" id={index}>add to cart.</button>
                                        <p>{currentItem.inventory}</p>
                                        <p>{currentItem.price}</p>
                                    </div>
                                )
                            })
                        }
                    </section>
                </div>
                <div>
                    <Cart cart={this.state.userCart}/>
                </div>
            </main>
        )
    }
}

export default Inventory;