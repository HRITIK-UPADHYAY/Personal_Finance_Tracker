import React from 'react'
import transaction from '../../Assets/NoTransaction.svg'
import '../Common/Style/noTransaction.css'

const NoTransaction = () => {
  return (
    <div className='image-for-no-data'>
      <img src={transaction} alt='No Transaction Image'/>
      <h2> No Transaction</h2>
    </div>
  )
}

export default NoTransaction