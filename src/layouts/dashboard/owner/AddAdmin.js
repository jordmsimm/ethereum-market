import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../../../store'
import AdministratorContract from '../../../../build/contracts/Administrator.json'
console.log(store)



class AddAdmin extends React.Component{
    state={
        error:undefined,
        message:'',
        address:''
    }

     
    
    addAdministrator = (address) =>{
        console.log('Address adde')
        const contract = require('truffle-contract')
        const administrator = contract(AdministratorContract)
        administrator.setProvider(this.props.web3.currentProvider)
        var administratorInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            administrator.deployed().then((instance) => {
                administratorInstance = instance;
                administratorInstance.addAdmin(address, {from:coinbase})
                .then((result) => this.setState(() => ({address:'',message:"Administrator added!"})))
            });
        })
       // this.setState(() => ({address:'',message:"Administrator added!"}));
        
    }
    handleAddAdmin = (e) =>{
        e.preventDefault();

        const address = e.target.elements.address.value.trim();
        if(this.props.web3.isAddress(address)){
            this.addAdministrator(address);
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
                <form className=''onSubmit={this.handleAddAdmin}>
                    <input placeholder="Add Administrator"
                            className=''type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.onAddressChange}></input>
                    <button className="" >Add Option</button>
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

export default connect(mapStateToProps)(AddAdmin);

//export default Dashboard
