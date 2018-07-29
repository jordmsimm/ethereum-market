import React from 'react'
import {connect} from 'react-redux'
import ipfs from '../../util/ipfs/ipfs';
import StoresContract from '../../../build/contracts/Stores.json';
import store from '../../store'


class ApplyStoreOwner extends React.Component{
    state={
        error:undefined,
        message:'',
        address:'',
        showForm:false,
        ipfsHash:null,
        buffer:''
    }
        
    componentDidMount(){
       console.log('component did mount')
      
    }
    handleAddProduct = (e) =>{
        e.preventDefault();
        //console.log(e.target.elements)
        let product = {
            name:e.target.elements.name.value.trim(),
            price:e.target.elements.price.value,
            quantity:e.target.elements.quantity.value
        }
        console.log(product)

    }

    handleToggleForm = (e) =>{
        e.preventDefault();
        const showForm = !this.state.showForm;

        this.setState(() => ({showForm}))
    }

    onSubmit = async (event) => {
        event.preventDefault();
  
        //bring in user's metamask account address
        // const accounts = await this.props.web3.eth.getAccounts();
       
        // console.log('Sending from Metamask account: ' + accounts[0]);
  
        // //obtain contract address from storehash.js
        // const ethAddress= await storehash.options.address;
        // this.setState({ethAddress});
  
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          console.log(err,ipfsHash);
          //setState by setting ipfsHash to ipfsHash[0].hash 
          this.setState({ ipfsHash:ipfsHash[0].hash });
          const contract = require('truffle-contract')
          const stores = contract(StoresContract)
          stores.setProvider(this.props.web3.currentProvider)
          var storesInstance;
          this.props.web3.eth.getCoinbase((error, coinbase) => {
              stores.deployed().then((instance) => {
                storesInstance = instance;

                // storesInstance.addProduct(storeOwnerName, {from:coinbase})
                // .then((result) => {
                //     store.dispatch(this.setIsStoreActive({store:false,storeOwnerName:storeOwnerName,storePending:true}));
                // })

              });
            });
          
        //   storehash.methods.sendHash(this.state.ipfsHash).send({
        //     from: accounts[0] 
        //   }, (error, transactionHash) => {
        //     console.log(transactionHash);
        //     this.setState({transactionHash});
        //   }); //storehash 
        }) //await ipfs.add 
      }; //onSubmit 
      captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    render(){
        return (
            <div>
                {this.state.showForm ? <button onClick={this.handleToggleForm}>Hide</button>: <button onClick={this.handleToggleForm}>Add Product</button>}
                {this.state.showForm &&
                    <form onSubmit={this.handleAddProduct}>
                       Store Name: <input type='text' name='name' required/> <br/>
                       Price: <input type='number' name='price' required/><br/>
                       Quantity: <input type='number' name='quantity' required/><br/>
                       <input 
                    type = "file"
                    onChange = {this.captureFile}
                    />
                    <button 
                    bsStyle="primary" 
                    type="submit"> 
                    Send it 
                    </button>
                    </form>
                }


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
