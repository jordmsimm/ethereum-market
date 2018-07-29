import React from 'react';
import ApplyStoreOwner from './ApplyStoreOwner';
import AddProduct from './AddProduct';
import CreateStoreFront from './CreateStoreFront';
//import ChangeAdminContractAddress from './ChangeAdminContractAddress'


const StoreOwner = (props) =>(
    <div className='option'>
        <h3>Store Owner Functions </h3>
        <ApplyStoreOwner/>
        <CreateStoreFront/>
        <AddProduct/>
    </div>
) ;  
export default StoreOwner