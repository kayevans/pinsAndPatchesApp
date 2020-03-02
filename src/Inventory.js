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
            subtotalRef: firebase.database().ref('subTotal'),
            inventoryToShow: [],
            userCart: [],
            subTotal: 0,
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

        // set up the price for firebase
        this.state.subtotalRef.on('value', (response)=>{

            // make 0 to set new state
            let stateToSet = 0;

            // capture the value of the response
            const dataFromDb = response.val();

            // make it equal to the value of subtotalref
            stateToSet = dataFromDb;

            // change the state to the new data
            this.setState({
                subTotal: stateToSet,
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
    handleAddToCart = (specificItem, itemIndex) => {

        // add to the database
        this.state.cartRef.push(specificItem);

        // make copy of array
        let updatedInventory = [...this.state.inventoryToShow];

        // change the inventory of the specific item
        updatedInventory[itemIndex].inventory = updatedInventory[itemIndex].inventory - 1;

        // use this to update subtotal
        let newSubtotal = this.state.subTotal;

        // add the price of item selected
        newSubtotal = newSubtotal + specificItem.price;

        // set the subtotal in the database
        this.state.subtotalRef.set(newSubtotal);

        // set the inventory to the new array and set the subtotal
        this.setState({
            inventoryToShow: updatedInventory,
        })
    }

    
    render(){
        return(
            <main className="inventory">
                <div>
                    <div className="flexContainer wrapper">
                        <nav className="sideNav">
                            <h2>browse by:</h2>
                            <ul>
                                <li><button onClick={this.handleShowAll}>All items</button></li>
                                <li><button onClick={this.handleShowPins}>Pins</button></li>
                                <li><button onClick={this.handleShowPatches}>Patches</button></li>
                            </ul>
                        </nav>
                        <section className="displayInventory">
                            {this.state.inventoryToShow.map((currentItem, index)=>{
                                    return(
                                        <div key={index} className="inventoryItem">
                                            <div className="imgCont">
                                                <img src={currentItem.image} alt={currentItem.name}/>
                                                <button onClick={()=>{this.handleAddToCart(currentItem, index)}} className="addToCart" id={index}>add to cart +</button>
                                            </div>
                                            <h3>{currentItem.name}</h3>
                                            <div className="info">
                                                <p>${currentItem.price} CAD</p>
                                                <p className="inStock">{currentItem.inventory} available</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                </div>
                <div>
                    {
                        this.props.cartState ? <Cart 
                        cart={this.state.userCart}
                        subtotal={this.state.subTotal}
                        cartFunc = {this.props.handleCartFunc}
                        />
                        : null
                    }
                </div>
            </main>
        )
    }
}

export default Inventory;