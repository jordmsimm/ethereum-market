import React from 'react'
import ActivateStoreOwner from './ActivateStoreOwner';
import ListStores from './ListStores';
//import ChangeAdminContractAddress from './ChangeAdminContractAddress'




const Admin = (props) =>(
    <div className='option'>
        <h3>Admin Functions </h3>
        <ActivateStoreOwner/>
        <ListStores/>
        
    </div>
) ;
export default Admin 