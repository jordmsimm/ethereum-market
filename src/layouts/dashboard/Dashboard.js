import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../../store'
import Owner from './owner/Owner'
import Admin from './adminsitrator/Admin';
import StoreOwner from './store/Store';


console.log(store)
class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }
  componentWillMount() {
   
    
    console.log('component will mount')
   // console.log(state.user)
  }


  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            {this.props.owner && <Owner/> }
            {this.props.admin && <Admin/> }
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
            <StoreOwner/>
          </div>
        </div>
      </main>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
      owner: state.user.owner,
      admin: state.user.admin
  };
}

export default connect(mapStateToProps)(Dashboard);

//export default Dashboard
