
import AdministratorContract from '../../build/contracts/Administrator.json'
import StoresContract from '../../build/contracts/Stores.json'

import store from '../store'

function setIsAdmin(results) {
    return {
      type: 'SET_ADMIN',
      payload: results
    }
  }  

  function setIsOwner(results) {
    return {
      type: 'SET_OWNER',
      payload: results
    }
  }  

  function setIsStoreActive(results) {
      
    return {
      type: 'SET_STORE',
      payload: results
    }
  }  
export function getUser(){
  //export let getUser = new Promise(function(resolve, reject) {
    let web3 = store.getState().web3.web3Instance;
    if (typeof web3 !== 'undefined') {
        const contract = require('truffle-contract')
        const administrator = contract(AdministratorContract)
        const stores = contract(StoresContract)
        administrator.setProvider(web3.currentProvider)
        stores.setProvider(web3.currentProvider)
        // Declaring this for later so we can chain functions on administrator
        var administratorInstance;
        var storesInstance;

        // Get accounts.
        web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance)=>{
                storesInstance = instance;
                storesInstance.getStoreOwnerInformation(coinbase)
                .then((result)=>{
                    
                    if(result[1]){
                        store.dispatch(setIsStoreActive({store:result[1],storeOwnerName:result[0],storePending:false}));
                    }else if(result[0] != ""){
                        store.dispatch(setIsStoreActive({store:result[1],storeOwnerName:result[0],storePending:true}));
                    }else{
                        store.dispatch(setIsStoreActive({store:result[1],storeOwnerName:result[0],storePending:false}));
                    }
                   
                })
            })
            administrator.deployed().then((instance) => {
                administratorInstance = instance;
                // set the user as admin in reducer
                administratorInstance.owner.call()
                    .then(function(result){
                        if(coinbase === result ){
                            store.dispatch(setIsOwner({owner:true}));
                        }else{
                            store.dispatch(setIsOwner({owner:false}));
                        }
                    });

                administratorInstance.isUserAdmin(coinbase)
                .then(function(result) {
                    console.log(result)
                    store.dispatch(setIsAdmin({admin:result}));
                    return result;
                })
            })
        })
    }else{
        console.error('Web3 is not initialized.');
        return setIsAdmin({isAdmin:false})
    }
  }
export default getUser;


  