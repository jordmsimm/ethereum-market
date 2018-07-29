import React from 'react'
import {connect} from 'react-redux'

import StoresContract from '../../../build/contracts/Stores.json';
import StoreListItem from './StoreListItem'


class ListStores extends React.Component{
    state={
        error:undefined,
        message:'',
        address:'',
        allStores:[]
    }
         
    componentDidMount(){
        //get stores to active 

        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        let allStores = [];
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.getTotalStoreOwners.call()
                .then((result)=>{
                    console.log('total stores')
                     
                     var storeIndx = 0
                    //console.log(totalStores)
                    if(result.toNumber() > 0){
                        var totalStores = Number(result.toNumber()) - 1;
                        console.log(totalStores)
                        for(var x=0;x <= totalStores;x++){
                        storesInstance.getStoreOwnerAddress(x)
                        .then((result)=>{
                            console.log('store owner address');
                            console.log(result)
                            let storeOwnerAddress = result;
                            storesInstance.getStoreOwnerInformation(result)
                            .then((result)=>{
                                console.log('store info')
                                console.log(storeOwnerAddress)
                                
                                var storeObj = {
                                    name:result[0],
                                    isActive:result[1],
                                    address:storeOwnerAddress,
                                    key:storeIndx 
                                }
                                storeIndx++;
                                
                                allStores.push(storeObj)
                                console.log(allStores)
                                this.setState(() => ({allStores:allStores}))
                                //console.log(result)
                            })
                        })
                    }
                        

                    }
                    //this.setState(() => ({currentAddress:result}))
                })
                .catch((err)=>{
                    console.log(err)
                })
                // storesInstance.setAdministratorContractAddress(address, {from:coinbase})
                // .then((result) => this.setState(() => ({address:'',message:"Admin Contract Address Changed!"})))
            
            });
        })
    }

    handleActivateButton(storeObj,web3){
        console.log('Change store owner address')
        console.log(storeObj)
        console.log(this.state)
        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.activateStoreOwner(storeObj.address, {from:coinbase})
                .then((result) => {
                    
                    let allStores = this.state.allStores;
                    allStores[storeObj.key].isActive = true;
                    this.setState(() => ({allStores:allStores}))

                })
            });
        })
    }

    handleBlockButton(storeObj){
        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.blockStoreOwner(storeObj.address, {from:coinbase})
                .then((result) => {
                    
                    let allStores = this.state.allStores;
                    allStores[storeObj.key].isActive = false;
                    this.setState(() => ({allStores:allStores}))

                })
            });
        })
    }
    
    render(){
        return (
            <div>
                {this.state.allStores.length == 0 ? <p>No Stores to activate</p>: <p>Stores: </p>}
                
                {this.state.allStores.map((item)=>{
                    return (<div>
                        <div className='option'>
                        <p className='option__text'>Store Owner Name:{item.name}</p>
                        <p className='option__text'>Store Owner Address:{item.address}</p>
                        {item.isActive ? 
                            <button onClick={(e) => {this.handleBlockButton(item)}}>Block</button> :
                            <button onClick={(e) => {this.handleActivateButton(item)}}>Activate</button>}
                        </div>
                    </div>)
                })}
            </div>
        ) ;
    }
}

function mapStateToProps(state, ownProps) {
  return {
      web3: state.web3.web3Instance,
      owner: state.user.owner,
      admin: state.user.admin
  };
}

export default connect(mapStateToProps)(ListStores);

//export default Dashboard
