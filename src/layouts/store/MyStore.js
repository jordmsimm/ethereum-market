import React, { Component } from 'react'
import StoresContract from '../../../build/contracts/Stores.json'
const contract = require('truffle-contract')
import store from '../../store'
class MyStore extends Component {

componentDidMount() {
  //   let web3 = store.getState().web3.web3Instance
  // // Double-check web3's status.
  // if (typeof web3 !== 'undefined') {
  //   console.log('web3 is defined');
  //   const stores = contract(StoresContract)
  //   stores.setProvider(web3.currentProvider)
  //   var storeInstance;

  //   web3.eth.getCoinbase((error, coinbase) => {
  //       console.log(coinbase)
  //       stores.deployed().then(function(instance) {
  //           storeInstance = instance
  //           storeInstance.applyForStore('my second store',{from: coinbase})
  //           .then(function(result){
  //               console.log(result)
  //               storeInstance.getStoreInformation(coinbase,{from: coinbase})
  //               .then(function(storeResult) {
  //                   console.log('store info here')
  //                   console.log(storeResult)
  //               })
  //           })
            
  //       })
  //   })
    
  // }
  //   console.log('component--+Did Mount')

}
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1> Hello Users</h1>
            <h2>Manage your store</h2>
            <p>Your Products.</p>
           </div>
        </div>
      </main>
    )
  }
}

export default MyStore
