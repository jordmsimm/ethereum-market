import React from 'react'
import {connect} from 'react-redux'

class StoreListItem extends React.Component{
    render(props){
        return (
            <div>
                <div className='option'>
                <p className='option__text'>Store Owner Name:{this.props.storeObj.name}</p>
                <p className='option__text'>Store Owner Address:{this.props.storeObj.address}</p>
                {this.props.storeObj.isActive ? 
                    <button onClick={(e) => {this.props.handleBlockButton(this.props.storeObj,this.props.web3)}}>Block</button> :
                    <button onClick={(e) => {this.props.handleActivateButton(this.props.storeObj,this.props.web3)}}>Activate</button>}
                </div>
            </div>
        )}
} ;


function mapStateToProps(state, ownProps) {
    return {
        web3: state.web3.web3Instance,
        owner: state.user.owner,
        admin: state.user.admin
    };
  }
  
  export default connect(mapStateToProps)(StoreListItem);



