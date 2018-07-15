import React from 'react'
import AddAdmin from './AddAdmin'
import ChangeAdminContractAddress from './ChangeAdminContractAddress'




const Owner = (props) =>(
    <div className='option'>
        <h3>Owner Functions </h3>
        <AddAdmin/>
        <ChangeAdminContractAddress/>
    </div>
) ;
export default Owner