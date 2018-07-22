import React from 'react'
import {connect} from 'react-redux'

import StoresContract from '../../../../build/contracts/Stores.json';


class ListStores extends React.Component{
    state={
        error:undefined,
        message:'',
        address:''
    }
        
    componentDidMount(){
        //get stores to active 

        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.getTotalStoreOwners.call()
                .then((result)=>{
                    console.log('total stores')
                    
                    
                    console.log(totalStores)
                    if(result.toNumber() > 0){
                        var totalStores = Number(result.toNumber()) - 1;
                        storesInstance.getStoreOwnerAddress(totalStores)
                        .then((result)=>{
                            console.log('store owner address');
                            console.log(result)
                            storesInstance.getStoreOwnerInformation(result)
                            .then((result)=>{
                                console.log('store info')
                                console.log(result)
                            })
                        })
                        .catch((err)=>{
                            console.log(err)
                        })

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

    
    render(){
        return (
            <div>
                this is the stores list
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
