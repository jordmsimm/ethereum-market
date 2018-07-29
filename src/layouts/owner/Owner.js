import React , { Component } from 'react'
import {connect} from 'react-redux'
import AddAdmin from './AddAdmin'
import ChangeAdminContractAddress from './ChangeAdminContractAddress'





class Owner extends Component {
    constructor(props, { authData }) {
        super(props)
        authData = this.props
      }
      render() {
        return(
        <div className='option'>
            <h3>Owner Functions </h3>
            <AddAdmin/>
            <ChangeAdminContractAddress/>
        </div>
        )}
     } ;

     function mapStateToProps(state, ownProps) {
        return {
            owner: state.user.owner,
            admin: state.user.admin
        };
      }
      
      export default connect(mapStateToProps)(Owner);
