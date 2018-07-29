import React from 'react'
import {connect} from 'react-redux'
import store from '../../store'
import StoresContract from '../../../build/contracts/Stores.json';


class ApplyStoreOwner extends React.Component{
    state={
        error:undefined,
        message:'',
        address:'',
        //storeOwnerName:'',
        //isActive:false,
        //pending:false
    }
        
    componentDidMount(){
       console.log('component did mount')
       console.log(this.props)
    }

    setIsStoreActive = (results)=>{
      
        return {
          type: 'SET_STORE',
          payload: results
        }
      }  
    applyStoreOwner = (storeOwnerName) =>{
        console.log('Change store owner address')
        const contract = require('truffle-contract')
        const stores = contract(StoresContract)
        stores.setProvider(this.props.web3.currentProvider)
        var storesInstance;
        this.props.web3.eth.getCoinbase((error, coinbase) => {
            stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.applyForStoreOwner(storeOwnerName, {from:coinbase})
                .then((result) => {
                    store.dispatch(this.setIsStoreActive({store:false,storeOwnerName:storeOwnerName,storePending:true}));
                })
            });
        })
       
        
       
    }
    handleApplyStoreOwner = (e) =>{
        e.preventDefault();
        console.log('button click')
        this.applyStoreOwner(this.props.data.name)
        //this.props.data.name
        
    }

    
    
    render(){
        return (
            <div>
            
                {this.props.store || this.props.storePending  ? 
                    <p>Hello {this.props.storeOwnerName}</p>:
                    <div><p>Apply for store:</p><button className="" onClick={this.handleApplyStoreOwner} >Apply</button></div>

                }
                {this.props.storePending && <p>Store Owner status: pending</p> }
                {this.props.store && <p>Store Owner status: Active</p> }
                
                
                    
                
            </div>
        ) ;
    }
}

function mapStateToProps(state, ownProps) {
  return {
      web3: state.web3.web3Instance,
      data:state.user.data,
      owner: state.user.owner,
      admin: state.user.admin,
      store:state.user.store,
      storeOwnerName:state.user.storeOwnerName,
      storePending:state.user.storePending
  };
}

export default connect(mapStateToProps)(ApplyStoreOwner);

//export default Dashboard
