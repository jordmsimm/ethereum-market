import React from 'react'

const StoreListItem = (props) =>(
    <div>
                <div className='option'>
                <p className='option__text'>Store Owner Name:{props.storeObj.name}</p>
                <p className='option__text'>Store Owner Address:{props.storeObj.address}</p>
                {props.storeObj.isActive ? 
                    <button onClick={(e) => {props.handleBlockButton(props.storeObj)}}>Block</button> :
                    <button onClick={(e) => {props.handleActivateButton(props.storeObj)}}>Activate</button>}
            </div>
            
            </div>
) ;
export default StoreListItem



