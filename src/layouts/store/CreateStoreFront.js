import React from 'react'
import {connect} from 'react-redux'
import ipfs from '../../util/ipfs/ipfs';
import StoresContract from '../../../build/contracts/Stores.json';
import store from '../../store'


class CreateStoreFront extends React.Component{
    state={
        error:undefined,
        message:'',
        address:'',
        showForm:false,
        ipfsHash:null,
        buffer:'',
        loading:false
    }
        
    componentDidMount(){
       console.log('component did mount')
      
    }
    onSubmit = async (event) => {
        event.preventDefault();
        let loading = true;
        this.setState(() => ({loading}))
        let storeFront = {
            name:event.target.elements.name.value.trim(),
        }
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          console.log(err,ipfsHash);
          storeFront.ipfsHash = ipfsHash[0].hash;
            console.log(storeFront)
          
          const contract = require('truffle-contract')
          const stores = contract(StoresContract)
          stores.setProvider(this.props.web3.currentProvider)
          var storesInstance;
          this.props.web3.eth.getCoinbase((error, coinbase) => {
              stores.deployed().then((instance) => {
                storesInstance = instance;
                storesInstance.addStoreFront(storeFront.name, {from:coinbase})
                .then((result) => {
                    event.target.elements.name.value = '';
                    let message = "Store front successfully created!"
                    this.setState(() => ({message}))
                    let loading = false;
                    this.setState(() => ({loading}))

                })

              });
            });
          
    
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

    handleToggleForm = (e) =>{
        e.preventDefault();
        const showForm = !this.state.showForm;
        this.setState(() => ({showForm}))
    }

    render(){
        return (
            <div>
                {this.state.showForm ? <button onClick={this.handleToggleForm}>Hide</button>: <button onClick={this.handleToggleForm}>Create New Store Front</button>}
                <img wwidth'src="https://media.giphy.com/media/4UfAFRHnp1sje/giphy.gif"/>

                {this.state.loading && <p> Loading</p>}
                {this.state.showForm &&
                    
                    <form onSubmit={this.onSubmit}>
                       Store Front Name: <input type='text' name='name' required/> <br/>
                       
                       <input 
                    type = "file"
                    onChange = {this.captureFile}
                    />
                    <button 
                    type="submit"> 
                    Create Storefront
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

export default connect(mapStateToProps)(CreateStoreFront);

//export default Dashboard
