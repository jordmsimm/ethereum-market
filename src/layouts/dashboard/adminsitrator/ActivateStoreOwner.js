import React from 'react'
import {connect} from 'react-redux'

import StoresContract from '../../../../build/contracts/Stores.json';


class ActivateStoreOwner extends React.Component{
    state={
        error:undefined,
        message:'',
        address:''
    }
        
    componentDidMount(){
        //get stores to active 

        // const contract = require('truffle-contract')
        // const stores = contract(StoresContract)
        // stores.setProvider(this.props.web3.currentProvider)
        // var storesInstance;
        // this.props.web3.eth.getCoinbase((error, coinbase) => {
        //     stores.deployed().then((instance) => {
        //         storesInstance = instance;
        //         storesInstance.adminAddress.call()
        //         .then((result)=>{
        //             console.log('this is the admin address')
        //             console.log(result)
        //             this.setState(() => ({currentAddress:result}))
        //         })
        //         // storesInstance.setAdministratorContractAddress(address, {from:coinbase})
        //         // .then((result) => this.setState(() => ({address:'',message:"Admin Contract Address Changed!"})))
            
        //     });
        // })
    }


    activateStoreOwner = (address) =>{
        console.log('Change store owner address')
        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.activateStoreOwner(address, {from:coinbase})
                .then((result) => this.setState(() => ({address:'',message:"StoreOwnerActivated"})))
            });
        })
       // this.setState(() => ({address:'',message:"Administrator added!"}));
        
       
    }
    handleStoreownerAddress = (e) =>{
        e.preventDefault();

        const address = e.target.elements.address.value.trim();
        if(this.props.web3.isAddress(address)){
            this.activateStoreOwner(address);
        }else{
            console.log('error')
            const error = "Must enter a valid address"
            this.setState(() => ({error:error}))
        }
    }

    onAddressChange = (e)=>{
        const error = '';
        const address = e.target.value.trim();
        this.setState(()=>({error:error,address:address}));
    };
    
    render(){
        return (
            <div>
                {this.state.error && <p className=''>{this.state.error}</p>}
                {this.state.message && <p className=''>{this.state.message}</p>}
                <p> Current Admin Address:</p>
                    <p> {this.state.currentAddress} </p>
                <form className=''onSubmit={this.handleStoreownerAddress}>
                    <input placeholder="Activate Store"
                            className=''type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.onAddressChange}></input>
                    <button className="" >Change</button>
                </form>
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

export default connect(mapStateToProps)(ActivateStoreOwner);

//export default Dashboard
