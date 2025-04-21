import React from 'react'
import './Style/table.css'

const Table = ({transactions}) => {

  return (
    <div className='table-container'>
      
         

      <div className='table-component'>
        <table>
            <thead>
                <tr className='table-heading'>
                    <th> Name </th>
                    <th> Type </th>
                    <th> Date </th>
                    <th> Amount </th>
                    <th> Tag </th>
                </tr>
            </thead>
            <tbody className='tbody '>
                {
                    transactions && transactions.length > 0 ? (
                      transactions.map((data, i) => (
                        <tr key={i}>
                          <td>{data.name}</td>
                          <td>{data.type}</td>
                          <td>{data.date}</td>
                          <td>{data.amount}</td>
                          <td>{data.tag}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--grey)'}} >
                          No Transaction
                        </td>
                      </tr>
                    )
                }

            </tbody>
          </table>
      </div>
    </div>
    
  )
}

export default Table
