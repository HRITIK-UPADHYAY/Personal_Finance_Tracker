import React from 'react'
import './Style/table.css'

const Table = ({transactions}) => {
  return (
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
        <tbody>
            {
                transactions && transactions.map((data) => (
                    <tr>
                        <td> {data.name}</td>
                        <td> {data.type} </td>
                        <td> {data.date} </td>
                        <td> {data.amount} </td>
                        <td> {data.tag} </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  )
}

export default Table
